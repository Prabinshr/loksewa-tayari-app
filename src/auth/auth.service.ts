import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TOKENS } from 'config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateJWT(userPayload: Partial<User>): Promise<ITokens> {
    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: userPayload.id,
          role: userPayload.role,
        },
        {
          secret: TOKENS.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: TOKENS.JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      refresh_token: await this.jwtService.signAsync(
        {
          sub: userPayload.id,
          role: userPayload.role,
        },
        {
          secret: TOKENS.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: TOKENS.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    };
  }

  async validateUser(payload: Partial<User>) {
    return this.prismaService.user.update({
      where: {
        id: payload.id,
      },
      data: {
        ...payload,
        verified: true,
      },
    });
  }
}