import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OtpService } from 'src/otp/otp.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { SMTP } from 'config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: SMTP.HOST,
        port: 465,
        auth: {
          user: SMTP.USER,
          pass: SMTP.PASS,
        },
      },
    }),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [UserController],
  providers: [JwtService, UserService, AuthService, OtpService],
})
export class UserModule {}
