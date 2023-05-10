import { HttpException, Injectable } from '@nestjs/common';
import { CreateExamCategoryDto } from './dto/create-exam-category.dto';
import { UpdateExamCategoryDto } from './dto/update-exam-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamCategoryService {
  constructor(private prisma: PrismaService) {}
  create(createExamCategoryDto: CreateExamCategoryDto) {
    try {
      return this.prisma.examCategory.create({ data: createExamCategoryDto });
    } catch (error) {
      throw new HttpException('Cannot create Exam-Category.', 404);
    }
  }

  findAll() {
    try {
      return this.prisma.examCategory.findMany();
    } catch (error) {
      throw new HttpException('Cannot find Exam-Categories.', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.examCategory.findUnique({ where: { id: id } });
    } catch (error) {
      throw new HttpException('Cannot find Exam-Category by id.', 404);
    }
  }

  update(id: string, updateExamCategoryDto: UpdateExamCategoryDto) {
    try {
      return this.prisma.examCategory.update({
        where: { id: id },
        data: updateExamCategoryDto,
      });
    } catch (error) {
      throw new HttpException('Cannot update Exam-Category.', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.examCategory.delete({where: {id: id}});
    } catch (error) {
      throw new HttpException('Cannot delete Exam-Category.', 404);
    }
  }
}
