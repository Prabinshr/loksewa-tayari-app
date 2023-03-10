import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/@generated/user/dto';
import { Pagination } from 'src/interface/Pagination.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    // Check if user exists
    // If not, create user
    // If yes, return error
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      },
    });
    if (user) throw new HttpException('User already exists', 400);
    const { password, ...newUser } = await this.prisma.user.create({
      data: createUserDto,
    });
    // Return user without password
    return newUser;
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

  remove(id: string) {
    // deletes a user
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
