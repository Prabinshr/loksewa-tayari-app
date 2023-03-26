import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { TOKENS } from 'config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: TOKENS.JWT_SECRET,
      signOptions: { expiresIn: '4d' },
      verifyOptions: { issuer: 'https://neptechpal.com' },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, UserService, AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
