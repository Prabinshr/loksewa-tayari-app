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

  // Getting Specific SubService's All Exam Sets
  @Get(':subService/')
  @Roles(Role.USER)
  findAllSets(@Param('subService') subService: string) {
    return this.examsetService.findAllSets(subService);
  }

  // Getting Specific SubService Exam Set
  @Get(':subService/:mock')
  @Roles(Role.USER)
  findSet(
    @Param('subService') subService: string,
    @Param('mock') mock: number,
  ) {
    return this.examsetService.findSet(subService, mock);
  }

  @Get(':id')
  @Roles(Role.USER)
  findOne(@Param('id') id: string) {
    return this.examsetService.findOne(id);
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
