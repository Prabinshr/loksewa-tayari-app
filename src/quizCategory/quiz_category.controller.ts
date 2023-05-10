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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQuizCategoryDto, UpdateQuizCategoryDto } from './dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';

@ApiTags('Quiz Category')
@Controller('quiz-category')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
export class QuizCategoryController {
  constructor(private readonly quizCategoryService: QuizCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create quiz-category.' })
  @Roles(Role.USER)
  create(@Body() createQuizCategoryDto: CreateQuizCategoryDto) {
    return this.quizCategoryService.create(createQuizCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get quiz-categories.' })
  // @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @Roles(Role.USER)
  findAll() {
    return this.quizCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz-category by id.' })
  // @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @Roles(Role.USER)
  findOne(@Param('id') id: string) {
    return this.quizCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quiz-category by id.' })
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  update(
    @Param('id') id: string,
    @Body() updateQuizCategoryDto: UpdateQuizCategoryDto,
  ) {
    return this.quizCategoryService.update(id, updateQuizCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz-category by id.' })
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  remove(@Param('id') id: string) {
    return this.quizCategoryService.remove(id);
  }
}
