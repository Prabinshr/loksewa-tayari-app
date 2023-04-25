import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TOKENS } from 'config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
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
        ...payload,
        verified: true,
      },
    });
  }
}
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService,
//     private otpService: OtpService,
//   ) {}

//   async register(userDetail: CreateUserDto) {
//     const emailExists = await this.userService.getUserByEmail(userDetail.email);

//     if (emailExists && emailExists.role === UserRole.ghost) {
//       const usernameExists = await this.userService.getUserByUsername(
//         userDetail.username,
//       );

//       if (usernameExists) {
//         throw new BadRequestException({
//           message: 'Username already exists.',
//         });
//       }

//       // const { ...savedUser } = await this.userService.createUser(userDetail);
//       const savedUser = await this.userService.createGhostUser(
//         emailExists.id,
//         userDetail,
//       );

//       // send email with OTP
//       const otp = await this.otpService.createOtp(
//         savedUser.id,
//         OTPType.emailVerification,
//       );

//       const html = await getMailTemplates(MailType.new_registration_otp, {
//         otp: otp.code,
//       });

//       sendMail({
//         to: savedUser.email,
//         subject: 'Email Verification',
//         html,
//       });

//       return savedUser;
//     }

//     if (emailExists) {
//       throw new BadRequestException({
//         message: 'Email already exists.',
//       });
//     }

//     const usernameExists = await this.userService.getUserByUsername(
//       userDetail.username,
//     );

//     if (usernameExists) {
//       throw new BadRequestException({
//         message: 'Username already exists.',
//       });
//     }

//     const { ...savedUser } = await this.userService.createUser(userDetail);

//     // send email with OTP
//     const otp = await this.otpService.createOtp(
//       savedUser.id,
//       OTPType.emailVerification,
//     );

//     const html = await getMailTemplates(MailType.new_registration_otp, {
//       otp: otp.code,
//     });

//     sendMail({
//       to: savedUser.email,
//       subject: 'Email Verification',
//       html,
//     });

//     return savedUser;
//   }

//   async login(input: LoginDto, response: any) {
//     const user = await this.validateUser(input.email, input.password);
//     const payload = { sub: user.id, role: user.role };
//     const access_token = await this.jwtService.signAsync(payload, {
//       expiresIn: '7d',
//       secret: process.env.JWT_SECRET,
//     });

//     response.cookie('jwt', access_token, {
//       httpOnly: true,
//       domain: 'localhost',
//     });

//     return {
//       verified: true,
//       jwt: access_token,
//       role: user.role,
//     };
//   }

//   async validateUser(email: string, password: string) {
//     const user = await this.userService.getUserByEmailWithPassword(email);
//     if (!user)
//       throw new UnauthorizedException({
//         verified: null,
//         message: 'Invalid email or password.',
//       });

//     if (!user.password) {
//       throw new UnauthorizedException({
//         verified: null,
//         message: 'Please register your account.',
//       });
//     }

//     const valid = await argon.verify(user.password, password);
//     if (!valid)
//       throw new UnauthorizedException({
//         verified: null,
//         message: 'Invalid email or password.',
//       });

//     if (!user.isVerified) {
//       // send email with OTP
//       const otp = await this.otpService.createOtp(
//         user.id,
//         OTPType.emailVerification,
//       );

//       sendMail({
//         to: email,
//         subject: 'Email Verification',
//         text: `Your Email Verification OTP is ${otp.code}`,
//       });

//       // sendGridMail(
//       //   email,
//       //   'Email Verification',
//       //   `Your Email Verification OTP is ${otp.code}`,
//       // );

//       throw new UnauthorizedException({
//         verified: false,
//         email,
//         message:
//           'User is not yet verified. Please check your inbox to verify your email.',
//       });
//     }

//     return user;
//   }

//   async resendEmailVerification(input: ResendEmailVerificationDto) {
//     const user = await this.userService.getUserByEmail(input.email);
//     if (!user) throw new NotFoundException('User not found');
//     if (user.isVerified)
//       throw new BadRequestException('User already verified.');

//     const previousOtp = await this.otpService.findLastOtp(
//       user.id,
//       OTPType.emailVerification,
//     );

//     if (previousOtp) {
//       const waitTime = 1000 * 60 * 1; // resend only after one minute
//       const completedWaitTime =
//         previousOtp.createdAt.getTime() + waitTime < Date.now();
//       if (!completedWaitTime) {
//         throw new BadRequestException('Please request OTP after one minute.');
//       }
//     }

//     // send email with OTP
//     const otp = await this.otpService.createOtp(
//       user.id,
//       OTPType.emailVerification,
//     );

//     sendMail({
//       to: user.email,
//       subject: 'Email Verification',
//       text: `Your Email Verification OTP is ${otp.code}`,
//     });

//     // sendGridMail(
//     //   user.email,
//     //   'Email Verification',
//     //   `Your Email Verification OTP is ${otp.code}`,
//     // );
//     return { message: 'Email verification OTP has been resent.' };
//   }

//   async verifyEmail(email: string, code: string) {
//     await this.userService.verifyEmail(email, code);

//     return { message: 'Email has been successfully verified.' };
//   }
// }
