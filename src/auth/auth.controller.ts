import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
import { CurrentUser } from 'src/helpers/decorator/current-user.decorator';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { Public } from 'src/decorators/public.decorator';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(AuthGuard('local')) // <---- This is important. It handles the authentication.
  async login(
    @CurrentUser() user,
    @Body(new ValidationPipe()) loginDto: LoginDTO,
  ) {
    // Only the authenticated user can access this route
    const token = await this.authService.generateJWT(user);
    if (token) {
      return { token };
    } else {
      throw new InternalServerErrorException("Couldn't generate token.");
    }
  }

  @Public()
  @Post('register')
  @ApiCreatedResponse({ type: User })
  @ApiBody({ type: CreateUserDto })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('validate-otp')
  @ApiBearerAuth("jwt")
  @ApiBody({ type: CreateOtpDto })
  
  async validateOtp(
    @CurrentUser() currentUser,
    @Body(new ValidationPipe()) otpDto: CreateOtpDto,
  ) {
    const validOTP = await this.otpService.validateOtp(
      currentUser.id,
      otpDto.code,
      otpDto.type,
    );
    if (!validOTP) {
      throw new InternalServerErrorException('Invalid OTP');
    }
    return this.authService.validateUser(currentUser);
  }
}
