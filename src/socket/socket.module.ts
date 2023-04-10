import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { OtpService } from 'src/otp/otp.service';
import { NoAuthGateway } from './no-auth.gateway';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [
    SocketGateway,
    NoAuthGateway,
    AuthService,
    SocketService,
    JwtService,
    UserService,
    OtpService,
  ],
})
export class SocketModule {}
