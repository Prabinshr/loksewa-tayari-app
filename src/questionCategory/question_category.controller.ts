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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionCategoryService } from './question_category.service';
import {
  CreateQuestionCategoryDto,
  UpdateQuestionCategoryDto,
} from './dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Question Category')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('question-category')
export class QuestionCategoryController {
  constructor(
    private readonly questionCategoryService: QuestionCategoryService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createQuestionCategoryDto: CreateQuestionCategoryDto) {
    return this.questionCategoryService.create(createQuestionCategoryDto);
  }

  @Get()
  findAll() {
    return this.questionCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionCategoryDto: UpdateQuestionCategoryDto,
  ) {
    return this.questionCategoryService.update(id, updateQuestionCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionCategoryService.remove(id);
  }
}
