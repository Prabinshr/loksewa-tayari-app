import { HttpException, Injectable } from '@nestjs/common';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamQuestionService {
  constructor(private prisma: PrismaService) {}
  create(createExamQuestionDto: CreateExamQuestionDto) {
    try {
      return this.prisma.examQuestion.create({ data: createExamQuestionDto });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findAll() {
    try {
      return `This action returns all examQuestion`;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findOne(id: number) {
    try {
      return `This action returns a #${id} examQuestion`;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  update(id: number, updateExamQuestionDto: UpdateExamQuestionDto) {
    try {
      return `This action updates a #${id} examQuestion`;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} examQuestion`;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
