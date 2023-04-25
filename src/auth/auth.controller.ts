import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as argon from 'argon2';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
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

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly prismaService: PrismaService,
  ) {}

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
}
