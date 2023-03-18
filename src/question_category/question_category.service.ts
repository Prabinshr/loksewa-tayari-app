import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateQuestionCategoryDto,
  UpdateQuestionCategoryDto,
} from 'src/@generated/questionCategory/dto/index';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionCategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createQuestionCategoryDto: CreateQuestionCategoryDto) {
    try {
      // Check if the questionCategory already exists.
      const questionCategory = await this.prisma.question_Category.findFirst({
        where: {
          name: createQuestionCategoryDto.name,
        },
      });
      if (questionCategory) return questionCategory;
      return await this.prisma.question_Category.create({
        data: createQuestionCategoryDto,
      });
    } catch (error) {
      throw new HttpException('Error creating questionCategory', 500);
    }
  }

  findAll() {
    try {
      return this.prisma.question_Category.findMany({
        include: {
          _count: {
            select: {
              quizzes: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException('Question Categories not found', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.question_Category.findFirst({
        where: {
          id: id,
        },
        include: {
          quizzes: true,
        },
      });
    } catch (error) {
      throw new HttpException('Question Category not found', 404);
    }
  }

  update(id: string, updateQuestionCategoryDto: UpdateQuestionCategoryDto) {
    try {
      return this.prisma.question_Category.update({
        where: {
          id: id,
        },
        data: updateQuestionCategoryDto,
      });
    } catch (error) {
      throw new HttpException('Question Category not found', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.question_Category.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Question Category not found', 404);
    }
  }
}
