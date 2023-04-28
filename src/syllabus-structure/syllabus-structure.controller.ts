import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SyllabusStructureService } from './syllabus-structure.service';
import { CreateSyllabusStructureDto } from './dto/create-syllabus-structure.dto';
import { UpdateSyllabusStructureDto } from './dto/update-syllabus-structure.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('syllabusStructure')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('syllabus-structure')
export class SyllabusStructureController {
  constructor(
    private readonly syllabusStructureService: SyllabusStructureService,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new syllabus-structure' })
  create(@Body() createSyllabusStructureDto: CreateSyllabusStructureDto) {
    return this.syllabusStructureService.create(createSyllabusStructureDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all syllabus-structure' })
  findAll() {
    return this.syllabusStructureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a syllabus-structure by id' })
  findOne(@Param('id') id: number) {
    return this.syllabusStructureService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a syllabus-structure' })
  update(
    @Param('id') id: number,
    @Body() updateSyllabusStructureDto: UpdateSyllabusStructureDto,
  ) {
    return this.syllabusStructureService.update(
      +id,
      updateSyllabusStructureDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a syllabus-structure' })
  remove(@Param('id') id: number) {
    return this.syllabusStructureService.remove(+id);
  }
}
