import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as argon from 'argon2';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { CreateOtpDto } from 'src/otp/dto';
import { OtpService } from 'src/otp/otp.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { Public } from 'src/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITokens } from './interfaces/tokens.interface';
import { OTPType } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly prismaService: PrismaService,
  ) {}

  @Throttle(8, 60)
  @Post('login')
  @Public()
  @UseGuards(AuthGuard('local')) // <---- This is important. It handles the authentication.
  async login(
    @CurrentUser() user,
    @Body(new ValidationPipe()) loginDto: LoginDTO,
  ) {
    // Only the authenticated user can access this route
    const tokens = await this.authService.generateJWT(user);
    if (!tokens) {
      throw new InternalServerErrorException("Couldn't generate token.");
    }
    const refreshTokenExists =
      await this.prismaService.refreshTokenHash.findUnique({
        where: { user_id: user.id },
      });
    if (refreshTokenExists) {
      await this.prismaService.refreshTokenHash.update({
        where: {
          user_id: user.id,
        },
        data: {
          token_hash: await argon.hash(tokens.refresh_token),
        },
      });
    } else {
      await this.prismaService.refreshTokenHash.create({
        data: {
          user_id: user.id,
          token_hash: await argon.hash(tokens.refresh_token),
        },
      });
    }

    return tokens;
  }

  @Public()
  @Post('register')
  @ApiCreatedResponse({ type: User })
  @ApiBody({ type: CreateUserDto })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('update-password')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Auth Update Password' })
  async updatePassword(
    @CurrentUser() user,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<ITokens> {
    return await this.authService.updatePassword(
      user.username,
      updatePasswordDto,
    );
  }

  @Public()
  @Post('forget-password')
  @ApiOperation({ summary: 'Auth Forget Password' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Password Reset Link Has Been Sent To Your Email.',
  })
  async forgetPassword(
    @Body() body: { email: string },
  ): Promise<{ success: boolean; message: string }> {
    return await this.authService.forgetPassword(body.email);
  }

  @Public()
  @Post('reset-password/:reset_token')
  @ApiOperation({ summary: 'Auth Reset Password' })
  @ApiResponse({
    status: 201,
    description: 'Password Reset Successfully.',
  })
  async resetPassword(
    @Param('reset_token', ParseIntPipe) reset_token: bigint,
    @Body() body: { newPassword: string },
  ): Promise<ITokens> {
    const { newPassword } = body;

    return await this.authService.resetPassword(reset_token, newPassword);
  }

  @Post('validate-otp')
  @ApiBearerAuth('jwt')
  @ApiBody({ type: CreateOtpDto })
  async validateOtp(
    @CurrentUser() currentUser,
    @Body(new ValidationPipe()) otpDto: CreateOtpDto,
  ) {
    // Verify the OTP code sent to the user is correct
    const validOTP = await this.otpService.validateOtp(
      currentUser.id,
      otpDto.code,
      otpDto.type,
    );
    // If the OTP code is not valid, throw an error
    if (!validOTP) {
      throw new InternalServerErrorException('Invalid OTP');
    }
    // If the OTP code is valid, return the authenticated user
    return this.authService.validateUser(currentUser);
  }

  @Post('resend-otp')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Resend OTP' })
  async resendOTP(@CurrentUser() currentUser): Promise<{ message: string }> {
    // If User Is VERIFIED USER then cannot resend OTP
    if (currentUser.verified)
      throw new BadRequestException(
        "You're already a Verified User! Cannot Send OTP!",
      );

    const { code, ...OTP } = await this.otpService.createOtp(
      currentUser.id,
      OTPType.EMAIL_VERIFICATION,
    );

    // Send OTP In Email
    await this.userService.sendOTPEmail(
      currentUser.email,
      currentUser.first_name,
      code,
    );

    return {
      message: 'Your OTP code has been sent to your email',
    };
  }
  /**
   * Endpoint for refreshing the token. It takes the user from the request and generates a
   * new refresh and access token.
   * @param currentUser the user that is logged in.
   * @returns a new access and refresh token.
   */
  @Post('refresh-token/:refresh_token')
  @ApiBearerAuth('jwt')
  async refreshToken(
    @CurrentUser() currentUser: User,
    @Param('refresh_token') refresh_token: string,
  ) {
    const currentUserWithHash = await this.prismaService.user.findFirst({
      where: {
        id: currentUser.id,
      },
      include: {
        hash: true,
      },
    });

    const hashMatched = await argon.verify(
      currentUserWithHash.hash.token_hash,
      refresh_token,
    );

    if (!hashMatched) {
      throw new InternalServerErrorException('Invalid refresh token');
    }
    // If the refresh token is valid, generate a new access and refresh token
    return this.authService.generateJWT(currentUser);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@CurrentUser() currentUser) {
    return currentUser;
  }
}
