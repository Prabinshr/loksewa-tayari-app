import { HttpException, Injectable } from '@nestjs/common';
import { CreateExamsetDto } from './dto/create-examset.dto';
import { UpdateExamsetDto } from './dto/update-examset.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamsetService {
  constructor(private prisma: PrismaService) {}
  create(createExamsetDto: CreateExamsetDto) {
    try {
      return this.prisma.examSet.create({ data: createExamsetDto });
    } catch (error) {
      throw new HttpException('Cannot create Exam.', 404);
    }
  }

  findAll() {
    try {
      return this.prisma.examSet.findMany({
        include: { examCategories: { include: { questions: true } } },
      });
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.examSet.findUnique({
        where: { id },
        include: { examCategories: { include: { questions: true } } },
      });
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  update(id: string, updateExamsetDto: UpdateExamsetDto) {
    try {
      return this.prisma.examSet.update({
        data: updateExamsetDto,
        where: { id },
        include: { examCategories: true },
      });
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.examSet.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }
}
