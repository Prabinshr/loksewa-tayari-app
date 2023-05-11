import { Injectable } from '@nestjs/common';
import { CreateExamsetDto } from './dto/create-examset.dto';
import { UpdateExamsetDto } from './dto/update-examset.dto';

@Injectable()
export class ExamsetService {
  create(createExamsetDto: CreateExamsetDto) {
    return 'This action adds a new examset';
  }

  findAll() {
    return `This action returns all examset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examset`;
  }

  update(id: number, updateExamsetDto: UpdateExamsetDto) {
    return `This action updates a #${id} examset`;
  }

  remove(id: number) {
    return `This action removes a #${id} examset`;
  }
}
