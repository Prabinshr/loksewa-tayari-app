import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { TOKENS } from 'config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OtpService } from 'src/otp/otp.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: TOKENS.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
      verifyOptions: { issuer: 'https://neptechpal.com' },
    }),
  ],
  providers: [
    UserService,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    OtpService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
