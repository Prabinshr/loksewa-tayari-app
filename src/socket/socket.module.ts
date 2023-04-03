import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { OtpService } from 'src/otp/otp.service';
import { NoAuthGateway } from './no-auth.gateway';

@Module({
  providers: [
    SocketGateway,
    NoAuthGateway,
    SocketService,
    JwtService,
    UserService,
    OtpService,
  ],
})
export class SocketModule {}
