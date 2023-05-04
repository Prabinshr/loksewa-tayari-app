import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Pagination } from 'src/interface/Pagination.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { OTPType, OnlineStatus, Role } from '@prisma/client';
import * as argon from 'argon2';
import { OtpService } from 'src/otp/otp.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly otpService: OtpService,
    private readonly authService: AuthService,
  ) {}

  async changeRole(id: string, role: Role) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          role,
        },
      });
      return user;
    } catch (error) {}
  }
  async updateOnlineStatus(id: string, status: OnlineStatus) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          onlineStatus: status,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }
  async create(createUserDto: CreateUserDto) {
    // Check if the username contains spaces or any special characters
    if (createUserDto.username.includes(' ')) {
      throw new HttpException('Username cannot contain spaces', 400);
    }
    // Check if user exists
    // If not, create user
    // If yes, return error
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: createUserDto.username.toLowerCase() },
          { email: createUserDto.email.toLowerCase() },
        ],
      },
    });
    if (user) throw new HttpException('User already exists', 400);
    const hashedPassword = await argon.hash(createUserDto.password);
    createUserDto.password = hashedPassword;
    const { password, ...newUser } = await this.prisma.user.create({
      data: {
        email: createUserDto.email.toLowerCase(),
        username: createUserDto.username.toLowerCase(),
        role: Role.USER,
        verified: false,
        ...createUserDto,
      },
    });
    if (newUser) {
      await this.otpService.createOtp(newUser.id, OTPType.EMAIL_VERIFICATION);
      // TODO : Mechanism to send OTP to user by EMAIL or PHONE.
    }
    // Generate JWT tokens
    const userTokens = await this.authService.generateJWT(newUser);

    const hashPresent = await this.prisma.refreshTokenHash.findFirst({
      where: {
        user_id: newUser.id,
      },
    });
    let hashedRefreshToken = await argon.hash(userTokens.refresh_token);
    if (hashPresent) {
      await this.prisma.refreshTokenHash.update({
        where: {
          id: hashPresent.id,
        },
        data: {
          token_hash: hashedRefreshToken,
          user_id: newUser.id,
        },
      });
    }
    await this.prisma.refreshTokenHash.create({
      data: {
        token_hash: hashedRefreshToken,
        user_id: newUser.id,
      },
    });
    // Return user without password
    return userTokens;
  }

  async findAll(page: number, limit: number) {
    const userCount = await this.prisma.user.count();
    // returns all the users stored in the database without the password
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: {
            transactions: true,
            progress: true,
            posts: true,
            comment: true,
          },
        },
      },
    });
    const userData = users.map((user) => {
      const { password, ...newUser } = user;
      return newUser;
    });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: Pagination = {};

    if (endIndex < (await this.prisma.user.count())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    return {
      results: userData,
      pagination: results,
    };
  }

  async findOne(id: string) {
    // returns a single user without the password
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        transactions: true,
        progress: true,
      },
    });
    const { password, ...withoutPassword } = user;
    return withoutPassword;
  }
  async findByUsername(username: string) {
    try {
      // returns a single user without the password
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          username: username,
        },
      });
      console.log(user);

      // const { password, ...withoutPassword } = user;
      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException('User not found', 404, {
        description: error as string,
      });
    }
  }
  async findByEmail(email: string) {
    try {
      // returns a single user without the password
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      // If User Doesn't Exists
      if (!user) throw new HttpException('User not found', 404);
      // const { password, ...withoutPassword } = user;
      return user;
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // updates a user
    const updatedUser = await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
    // returns the updated user without the password
    const { password, ...withoutPassword } = updatedUser;
    return withoutPassword;
  }
  async getOnlineUsers() {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          onlineStatus: OnlineStatus.ONLINE,
        },
      });
      const userData = users.map((user) => {
        const { password, ...passwordLessUser } = user;
        return passwordLessUser;
      });
      return userData;
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  remove(id: string) {
    // deletes a user
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
