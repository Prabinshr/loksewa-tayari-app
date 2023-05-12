import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamQuestionService } from './exam-question.service';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';

@Controller('exam-question')
export class ExamQuestionController {
  constructor(private readonly examQuestionService: ExamQuestionService) {}

  @Post()
  create(@Body() createExamQuestionDto: CreateExamQuestionDto) {
    return this.examQuestionService.create(createExamQuestionDto);
  }

  @Get()
  findAll() {
    return this.examQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examQuestionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamQuestionDto: UpdateExamQuestionDto) {
    return this.examQuestionService.update(+id, updateExamQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examQuestionService.remove(+id);
  }
}
