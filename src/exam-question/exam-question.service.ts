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
    try{
      return this.prisma.examQuestion.findMany()

    }catch(err){
      throw new HttpException(err,500)
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.examQuestion.findUnique({ where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  update(id: string, updateExamQuestionDto: UpdateExamQuestionDto) {
    try {
      return this.prisma.examQuestion.update({
        data: updateExamQuestionDto,
        where: { id },
      });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  remove(id: string) {
    try{
      return this.prisma.examQuestion.delete({where:{id}})

    }catch(err){
      throw new HttpException(err,500)
    }
  }
}
