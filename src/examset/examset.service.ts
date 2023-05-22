import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  // Getting Specific SubService Exam Sets
  async findAllSets(subService: string) {
    try {
      // Getting SubService's ID
      const { id, ...subServ } = await this.prisma.subService.findFirst({
        where: {
          title: subService.toUpperCase(),
        },
      });

      if (!id)
        throw new HttpException('Invalid Sub Service', HttpStatus.BAD_REQUEST);

      // Getting ExamSets Using SubService's ID
      return await this.prisma.examSet.findMany({
        where: {
          subService_id: id,
        },
      });
    } catch (e) {
      throw new HttpException(
        'Something Went Wrong Finding SubService Exam Sets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Getting Specific SubService Exam Set
  async findSet(subService: string, mock: number) {
    try {
      // Getting SubService's ID
      const { id, ...subServ } = await this.prisma.subService.findFirst({
        where: {
          title: subService.toUpperCase(),
        },
      });

      if (!id)
        throw new HttpException('Invalid Sub Service', HttpStatus.BAD_REQUEST);

      // Getting ExamSets Using SubService's ID
      return await this.prisma.examSet.findMany({
        where: {
          subService_id: id,
          mock,
        },
        include: { examCategories: { include: { questions: true } } },
      });
    } catch (e) {
      throw new HttpException(
        'Something Went Wrong Finding SubService Exam Sets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
  async filter(mock: number) {
    const filter = await this.prisma.examSet.findMany({
      where: { mock },
      include: { examCategories: true },
    });
    return filter;
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
