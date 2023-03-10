import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { QuizCategoryService } from './quiz_category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuizCategoryDto, UpdateQuizCategoryDto } from 'src/@generated/quizCategory/dto';

@ApiTags('Quiz Category')
@Controller('quiz-category')
export class QuizCategoryController {
  constructor(private readonly quizCategoryService: QuizCategoryService) {}

  @Post()
  create(@Body() createQuizCategoryDto: CreateQuizCategoryDto) {
    return this.quizCategoryService.create(createQuizCategoryDto);
  }

  @Get()
  findAll() {
    return this.quizCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizCategoryDto: UpdateQuizCategoryDto,
  ) {
    return this.quizCategoryService.update(id, updateQuizCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizCategoryService.remove(id);
  }
}
