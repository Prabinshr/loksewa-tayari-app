import { HttpException, Injectable } from '@nestjs/common';
import { CreateQuizDto, UpdateQuizDto } from 'src/@generated/quiz/dto/index';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}
  async create(createQuizDto: CreateQuizDto) {
    try {
      // Check if the quiz already exists.
      const quiz = await this.prisma.quiz.findFirst({
        where: {
          name: createQuizDto.name,
        },
      });
      if (quiz) return quiz;
      return await this.prisma.quiz.create({
        data: createQuizDto,
      });
    } catch (error) {
      throw new HttpException('Error creating quiz', 500);
    }
  }

  findAll() {
    try {
      return this.prisma.quiz.findMany({
        include: {
          _count: {
            select: {
              Question: true,
              Transaction: true,
              User_Progress: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException('Quiz Categories not found', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.quiz.findFirst({
        where: {
          id: id,
        },
        include: {
          Question: true,
          Transaction: true,
          User_Progress: true,
        },
      });
    } catch (error) {
      throw new HttpException('Quiz not found', 404);
    }
  }

  update(id: string, updateQuizDto: UpdateQuizDto) {
    try {
      return this.prisma.quiz.update({
        where: {
          id: id,
        },
        data: updateQuizDto,
      });
    } catch (error) {
      throw new HttpException('Quiz not found', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.quiz.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Quiz not found', 404);
    }
  }
}
