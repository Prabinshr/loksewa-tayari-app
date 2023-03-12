import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtSecret } from '../utils/constant';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const { username, email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (foundUser) {
      throw new BadRequestException('Email already exists ');
    }
    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,

      },
    });

    return {
      message: 'signup was successful ',
    };
  }
  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials ');
    }
    const isPasswordValid = await this.comparePassword({
      password,
      hash: foundUser.password,
    });
    if (!isPasswordValid) {
      throw new BadRequestException('Wrong credentials ');
    }

    // sign jwt and return to user

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie('token', token);

    return res.send({
        message: 'signin was successful ',
        token
    })
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({
        message: 'signout was successful ',
    });
  }

  async hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }
  async comparePassword(args: { password: string; hash: string }) {
    const { password, hash } = args;
    return await bcrypt.compare(password, hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;

    return this.jwt.signAsync(payload, {
      secret: jwtSecret,
    });
  }
}
