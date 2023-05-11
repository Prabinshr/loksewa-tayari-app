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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionCategoryService } from './question_category.service';
import { CreateQuestionCategoryDto, UpdateQuestionCategoryDto } from './dto';
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
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Create question-category.' })
  create(@Body() createQuestionCategoryDto: CreateQuestionCategoryDto) {
    return this.questionCategoryService.create(createQuestionCategoryDto);
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get all question-categories.' })
  findAll() {
    return this.questionCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question-category by id.' })
  @Roles(Role.USER)
  findOne(@Param('id') id: string) {
    return this.questionCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update question-category by id.' })
  @Roles(Role.USER)
  update(
    @Param('id') id: string,
    @Body() updateQuestionCategoryDto: UpdateQuestionCategoryDto,
  ) {
    return this.questionCategoryService.update(id, updateQuestionCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete question-category by id.' })
  @Roles(Role.USER)
  remove(@Param('id') id: string) {
    return this.questionCategoryService.remove(id);
  }
}
