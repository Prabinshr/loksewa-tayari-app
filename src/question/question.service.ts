import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      // Check if the question already exists.
      const question = await this.prisma.question.findFirst({
        where: {
          text: createQuestionDto.text,
        },
      });
      if (question) return question;
      return await this.prisma.question.create({
      data: createQuestionDto
      });
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException('Question could not be created', {
        description: error.toString(),
      });
    }
  }

  findAll() {
    try {
      return this.prisma.question.findMany();
    } catch (error) {
      throw new HttpException('Question Categories not found', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.question.findFirst({
        where: {
          id: id,
        },
        include: {
          quiz: true,
        },
      });
    } catch (error) {
      throw new HttpException('Question not found', 404);
    }
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      return this.prisma.question.update({
        where: {
          id: id,
        },
        data: updateQuestionDto,
      });
    } catch (error) {
      throw new HttpException('Question not found', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.question.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Question not found', 404);
    }
  }
}
