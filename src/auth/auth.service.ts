import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TOKENS } from 'config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITokens } from './interfaces/tokens.interface';
import { sendResetEmail } from './email';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { User } from 'src/user/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  async generateJWT(userPayload: Partial<User>): Promise<ITokens> {
    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: userPayload.id,
          role: userPayload.role,
        },
        {
          secret: TOKENS.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: TOKENS.JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      refresh_token: await this.jwtService.signAsync(
        {
          sub: userPayload.id,
          role: userPayload.role,
        },
        {
          secret: TOKENS.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: TOKENS.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    };
  }

  async validateUser(payload: Partial<User>) {
    return this.prismaService.user.update({
      where: {
        id: payload.id,
      },
      data: {
        verified: true,
      },
    });
  }

  async forgetPassword(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.userService.findByEmail(email);

    // Insert Email, Password Reset Token & Password Reset Token Expiration Date
    // in the Reset Password Database Model
    const pass_reset_token =
      Math.floor(Math.random() * 9000000000) + 1000000000;
    const pass_reset_token_expires = Date.now() + 10 * 60 * 1000;

    const newResetPassword = await this.prismaService.resetPassword.upsert({
      where: {
        email,
      },
      create: {
        email,
        pass_reset_token,
        pass_reset_token_expires,
      },
      update: {
        pass_reset_token,
        pass_reset_token_expires,
      },
    });

    // Sending Email with Reset Link
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'NepTechPal <no-reply@neptechpal.com>',
        subject: 'Reset Password Link',
        text: 'Click On The Button Below To Reset Password',
        html: `${sendResetEmail(newResetPassword.pass_reset_token)}`,
      });

      return {
        success: true,
        message: 'Reset Password Link Has Been Sent To Your Email',
      };
    } catch (e) {
      return {
        success: false,
        message: 'Something Went Wrong Sending Email',
      };
    }
  }

  async resetPassword(
    reset_token: bigint,
    newPassword: string,
  ): Promise<ITokens> {
    // Checking If Valid Token Exists & If the Token Has Not Expired
    const user = await this.prismaService.resetPassword.findFirst({
      where: {
        pass_reset_token: reset_token,
        pass_reset_token_expires: { gt: Date.now() },
      },
    });

    if (!user) throw new HttpException('Reset Token Has Expired', 498);

    // If User Exists Then Reset Password
    const hashedPassword = await argon.hash(newPassword);

    const { password, ...userWithNewPass } =
      await this.prismaService.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashedPassword,
        },
      });

    // Removing the Field from "Reset Password Database"
    await this.prismaService.resetPassword.delete({
      where: {
        email: user.email,
      },
    });

    // Logging In User & Sending Access Token And Refresh Token
    const userTokens = await this.generateJWT(userWithNewPass);

    const hashPresent = await this.prismaService.refreshTokenHash.findFirst({
      where: {
        user_id: userWithNewPass.id,
      },
    });
    let hashedRefreshToken = await argon.hash(userTokens.refresh_token);
    if (hashPresent) {
      await this.prismaService.refreshTokenHash.update({
        where: {
          id: hashPresent.id,
        },
        data: {
          token_hash: hashedRefreshToken,
          user_id: userWithNewPass.id,
        },
      });
    }
    await this.prismaService.refreshTokenHash.create({
      data: {
        token_hash: hashedRefreshToken,
        user_id: userWithNewPass.id,
      },
    });

    return userTokens;
  }
}
