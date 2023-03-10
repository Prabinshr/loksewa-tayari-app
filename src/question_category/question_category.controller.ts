import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionCategoryService } from './question_category.service';
import {
  CreateQuestionCategoryDto,
  UpdateQuestionCategoryDto,
} from 'src/@generated/questionCategory/dto';

@ApiTags('Question Category')
@Controller('question-category')
export class QuestionCategoryController {
  constructor(
    private readonly questionCategoryService: QuestionCategoryService,
  ) {}

  @Post()
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
