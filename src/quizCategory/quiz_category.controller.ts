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
import { QuizCategoryService } from './quiz_category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuizCategoryDto, UpdateQuizCategoryDto } from './dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/guard/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Quiz Category')
@Controller('quiz-category')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class QuizCategoryController {
  constructor(private readonly quizCategoryService: QuizCategoryService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createQuizCategoryDto: CreateQuizCategoryDto) {
    return this.quizCategoryService.create(createQuizCategoryDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  findAll() {
    return this.quizCategoryService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  findOne(@Param('id') id: string) {
    return this.quizCategoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateQuizCategoryDto: UpdateQuizCategoryDto,
  ) {
    return this.quizCategoryService.update(id, updateQuizCategoryDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.quizCategoryService.remove(id);
  }
}
