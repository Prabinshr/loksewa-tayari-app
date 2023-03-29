import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OtpService } from 'src/otp/otp.service';

@Module({
  controllers: [UserController],
  providers: [UserService, OtpService],
})
export class UserModule {}
