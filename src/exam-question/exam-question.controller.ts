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
import { ExamQuestionService } from './exam-question.service';
import { CreateExamQuestionDto } from './dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from './dto/update-exam-question.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Exam Question')
@ApiBearerAuth('jwt')
@Controller('exam-question')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamQuestionController {
  constructor(private readonly examQuestionService: ExamQuestionService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create Question "Admin"' })
  create(@Body() createExamQuestionDto: CreateExamQuestionDto) {
    return this.examQuestionService.create(createExamQuestionDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Get All Question "Admin, Mod, Subed User"' })
  findAll() {
    return this.examQuestionService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Get One Question' })
  findOne(@Param('id') id: string) {
    return this.examQuestionService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update Question "Admin"' })
  update(
    @Param('id') id: string,
    @Body() updateExamQuestionDto: UpdateExamQuestionDto,
  ) {
    return this.examQuestionService.update(id, updateExamQuestionDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete Question "Admin"' })
  remove(@Param('id') id: string) {
    return this.examQuestionService.remove(id);
  }
}
