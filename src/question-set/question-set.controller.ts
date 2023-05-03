import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuestionSetService } from './question-set.service';
import { CreateQuestionSetDto } from './dto/create-question-set.dto';
import { UpdateQuestionSetDto } from './dto/update-question-set.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('QuestionSet')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('question-set')
export class QuestionSetController {
  constructor(private readonly questionSetService: QuestionSetService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new Question-Set' })
  create(@Body() createQuestionSetDto: CreateQuestionSetDto) {
    return this.questionSetService.create(createQuestionSetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Question-Sets' })
  findAll() {
    return this.questionSetService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single Question-Set by id' })
  findOne(@Param('id') id: string) {
    return this.questionSetService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Question-Set by id' })
  update(
    @Param('id') id: string,
    @Body() updateQuestionSetDto: UpdateQuestionSetDto,
  ) {
    return this.questionSetService.update(id, updateQuestionSetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Question-Set by id' })
  remove(@Param('id') id: string) {
    return this.questionSetService.remove(id);
  }
}
