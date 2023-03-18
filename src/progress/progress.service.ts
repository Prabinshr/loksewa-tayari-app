import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserProgressDto, UpdateUserProgressDto } from 'src/@generated/userProgress/dto/index';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProgressService {
  constructor(private prisma: PrismaService) {}
  async create(
    createUserProgressDto: CreateUserProgressDto,
    quiz_id: string,
    user_id: string,
  ) {
    try {
      return await this.prisma.user_Progress.create({
        data: {
          ...createUserProgressDto,
          quiz_id,
          user_id,
        },
      });
    } catch (error) {
      throw new HttpException('Error creating user progress', 500);
    }
  }

  findAll() {
    try {
      return this.prisma.user_Progress.findMany({
        include: {
          user: true,
          quiz: true,
        },
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.user_Progress.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
          quiz: true,
        },
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }

  update(id: string, UpdateUserProgressDto: UpdateUserProgressDto) {
    try {
      return this.prisma.user_Progress.update({
        where: {
          id: id,
        },
        data: UpdateUserProgressDto,
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.user_Progress.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }
}
