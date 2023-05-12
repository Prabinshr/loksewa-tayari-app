import { HttpException, Injectable } from '@nestjs/common';
import { CreateExamsetDto } from './dto/create-examset.dto';
import { UpdateExamsetDto } from './dto/update-examset.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamsetService {
  constructor(private prisma: PrismaService) {}
  create(createExamsetDto: CreateExamsetDto) {
    
    try {
      return this.prisma.exam.create({ data: createExamsetDto });
    } catch (error) {
      throw new HttpException('Cannot create Exam.', 404);
    }
  }

  findAll() {
    try{
      return this.prisma.exam.findMany()
    }catch(error){
      throw new HttpException(error, 404);
    }
  }

  findOne(id: string) {
    try{
      return this.prisma.exam.findUnique({where:{id}})
    }catch(error){
      throw new HttpException(error, 404);
    }
  }

  update(id: string, updateExamsetDto: UpdateExamsetDto) {
    try{
      return this.prisma.exam.update({data:updateExamsetDto,where:{id}})
    }catch(error){
      throw new HttpException(error, 404);
    }
  }

  remove(id: number) {
    try{
      return this.prisma.exam.
    }catch(error){
      throw new HttpException(error, 404);
    }
  }
}
