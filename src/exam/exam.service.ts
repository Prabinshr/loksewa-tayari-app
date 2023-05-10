import { HttpException, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}
  create(createExamDto: CreateExamDto) {
    try {
      return this.prisma.exam.create({ data: createExamDto });
    } catch (error) {
      throw new HttpException('Cannot create Exam.', 404);
    }
  }

  findAll() {
    try {
      return this.prisma.exam.findMany();
    } catch (error) {
      throw new HttpException('Cannot find all Exams.', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.exam.findUnique({ where: { id: id } });
    } catch (error) {
      throw new HttpException('Cannot find Exam by id.', 404);
    }
  }

  update(id: string, updateExamDto: UpdateExamDto) {
    try {
      return this.prisma.exam.update({
        where: { id: id },
        data: updateExamDto,
      });
    } catch (error) {
      throw new HttpException('Cannot update Exam.', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.coupon.delete({ where: { id: id } });
    } catch (error) {
      throw new HttpException('Cannot create Exam.', 404);
    }
  }
}
