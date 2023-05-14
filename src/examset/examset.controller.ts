import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExamsetService } from './examset.service';
import { CreateExamsetDto } from './dto/create-examset.dto';
import { UpdateExamsetDto } from './dto/update-examset.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('examset')
@ApiTags('Exam Set')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
// @Roles(Role.ADMIN)

export class ExamsetController {
  constructor(private readonly examsetService: ExamsetService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createExamsetDto: CreateExamsetDto) {
    return this.examsetService.create(createExamsetDto);
  }

  @Get()
  @Roles(Role.USER)
  findAll() {
    return this.examsetService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  findOne(@Param('id') id: string) {
    return this.examsetService.findOne(id);
  }
  @Get('filter')
  @Roles(Role.USER)
  async findfilter(@Query('mock', ParseIntPipe) mock: number) {
    return this.examsetService.filter(mock);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateExamsetDto: UpdateExamsetDto) {
    return this.examsetService.update(id, updateExamsetDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.examsetService.remove(id);
  }
}
