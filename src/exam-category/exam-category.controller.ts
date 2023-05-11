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
import { ExamCategoryService } from './exam-category.service';
import { CreateExamCategoryDto } from './dto/create-exam-category.dto';
import { UpdateExamCategoryDto } from './dto/update-exam-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('ExamCategory')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Roles(Role.USER)
@Controller('exam-category')
export class ExamCategoryController {
  constructor(private readonly examCategoryService: ExamCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create exam-category.' })
  create(@Body() createExamCategoryDto: CreateExamCategoryDto) {
    return this.examCategoryService.create(createExamCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exam-categories.' })
  findAll() {
    return this.examCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam-category by id.' })
  findOne(@Param('id') id: string) {
    return this.examCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update exam-category by id.' })
  update(
    @Param('id') id: string,
    @Body() updateExamCategoryDto: UpdateExamCategoryDto,
  ) {
    return this.examCategoryService.update(id, updateExamCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete exam-category by id.' })
  remove(@Param('id') id: string) {
    return this.examCategoryService.remove(id);
  }
}
