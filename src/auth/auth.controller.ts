import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDTO })
  @UseGuards(AuthGuard('local')) // <---- This is important. It handles the authentication.
  async login(@Request() req, @Body(new ValidationPipe()) loginDto: LoginDTO) {
    // Only the authenticated user can access this route
    console.log(req.user);
    const token = await this.authService.generateJWT(req.user);
    if (token) {
      return { token };
    } else {
      throw new InternalServerErrorException("Couldn't generate token.");
    }
  }
}
