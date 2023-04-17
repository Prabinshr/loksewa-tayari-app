import { HttpException, Injectable } from '@nestjs/common';
import { CreateQuestionSetDto } from './dto/create-question-set.dto';
import { UpdateQuestionSetDto } from './dto/update-question-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionSetService {
  constructor(private prismaService: PrismaService) {}
  create(createQuestionSetDto: CreateQuestionSetDto) {
    try {
      return this.prismaService.questionSet.create({
        data: createQuestionSetDto,
      });
    } catch (error) {
      throw new HttpException('Cannot create new question set.', 404);
    }
  }

  findAll() {
    try {
      return this.prismaService.questionSet.findMany({
        include: {
          questions: true,
        },
      });
    } catch (error) {
      throw new HttpException('Cannot get all question sets.', 404);
    }
  }

  findOne(id: number) {
    try {
      return this.prismaService.questionSet.findUnique({
        where: { id: id },
        include: {
          questions: true,
        },
      });
    } catch (error) {
      throw new HttpException('Cannot find a question set by id', 404);
    }
  }

  update(id: number, updateQuestionSetDto: UpdateQuestionSetDto) {
    try {
      return this.prismaService.questionSet.update({
        data: updateQuestionSetDto,
        where: { id: id },
      });
    } catch (error) {
      throw new HttpException('Cannot update a question set by id', 404);
    }
  }

  remove(id: number) {
    try {
      return this.prismaService.questionSet.delete({ where: { id: id } });
    } catch (error) {
      throw new HttpException('Cannot delete a question set by id', 404);
    }
  }
}
