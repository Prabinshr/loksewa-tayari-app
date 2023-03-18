import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

import { Request, Response } from 'express';
import { SignupDto } from './dto/sign_up.dto';
import { SigninDto } from './dto/sign_in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('signup')

  signup(@Body() dto: SignupDto){

    return this.authService.signup(dto)
  }
  @Post('signin')

  signin(@Body() dto: SigninDto, @Req() req: Request, @Res() res: Response){

    return this.authService.signin(dto, req, res)
  }


  @Get('signout')

  signout(@Req() req, @Res() res){

    return this.authService.signout
  }
}
