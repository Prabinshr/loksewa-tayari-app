import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Otp } from './entities/otp.entity';

@Module({
  imports: [],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
