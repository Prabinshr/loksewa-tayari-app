import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExamQuestionService } from './exam-question.service';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('exam-question')
export class ExamQuestionController {
  constructor(private readonly examQuestionService: ExamQuestionService) {}

  @Post()
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  create(@Body() createExamQuestionDto: CreateExamQuestionDto) {
    return this.examQuestionService.create(createExamQuestionDto);
  }

  @Get()
  findAll() {
    return this.examQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examQuestionService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateExamQuestionDto: UpdateExamQuestionDto) {
    return this.examQuestionService.update(id, updateExamQuestionDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.examQuestionService.remove(id);
  }
}
