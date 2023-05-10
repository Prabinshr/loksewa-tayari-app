import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Exam')
@Controller('exam')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Roles(Role.USER)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiOperation({ summary: 'Create Exam.' })
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exams.' })
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam by id.' })
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update exam by id.' })
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(id, updateExamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete exam by id.' })
  remove(@Param('id') id: string) {
    return this.examService.remove(id);
  }
}
