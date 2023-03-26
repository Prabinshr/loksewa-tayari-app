import { HttpException, Injectable } from '@nestjs/common';
import { CreateQuizCategoryDto, UpdateQuizCategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizCategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createQuizCategoryDto: CreateQuizCategoryDto) {
    try {
      // Check if the quizCategory already exists.
      const quizCategory = await this.prisma.quiz_Category.findFirst({
        where: {
          name: createQuizCategoryDto.name,
        },
      });
      if (quizCategory) return quizCategory;
      return await this.prisma.quiz_Category.create({
        data: createQuizCategoryDto,
      });
    } catch (error) {
      throw new HttpException('Error creating quizCategory', 500);
    }
  }

  findAll() {
    try {
      return this.prisma.quiz_Category.findMany({
        include: {
          _count: {
            select: {
              quizzes: true,
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
      return this.prisma.quiz_Category.findFirst({
        where: {
          id: id,
        },
        include: {
          quizzes: true,
        },
      });
    } catch (error) {
      throw new HttpException('Quiz Category not found', 404);
    }
  }

  update(id: string, updateQuizCategoryDto: UpdateQuizCategoryDto) {
    try {
      return this.prisma.quiz_Category.update({
        where: {
          id: id,
        },
        data: updateQuizCategoryDto,
      });
    } catch (error) {
      throw new HttpException('Quiz Category not found', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.quiz_Category.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Quiz Category not found', 404);
    }
  }
}
