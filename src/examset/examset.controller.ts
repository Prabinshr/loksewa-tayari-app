import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamsetService } from './examset.service';
import { CreateExamsetDto } from './dto/create-examset.dto';
import { UpdateExamsetDto } from './dto/update-examset.dto';

@Controller('examset')
export class ExamsetController {
  constructor(private readonly examsetService: ExamsetService) {}

  @Post()
  create(@Body() createExamsetDto: CreateExamsetDto) {
    return this.examsetService.create(createExamsetDto);
  }

  @Get()
  findAll() {
    return this.examsetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamsetDto: UpdateExamsetDto) {
    return this.examsetService.update(+id, updateExamsetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsetService.remove(+id);
  }
}
