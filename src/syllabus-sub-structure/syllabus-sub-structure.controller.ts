import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SyllabusSubStructureService } from './syllabus-sub-structure.service';
import { CreateSyllabusSubStructureDto } from './dto/create-syllabus-sub-structure.dto';
import { UpdateSyllabusSubStructureDto } from './dto/update-syllabus-sub-structure.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('syllabusSubStructure')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('syllabus-sub-structure')
export class SyllabusSubStructureController {
  constructor(
    private readonly syllabusSubStructureService: SyllabusSubStructureService,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new syllabus-sub-structure' })
  create(@Body() createSyllabusSubStructureDto: CreateSyllabusSubStructureDto) {
    return this.syllabusSubStructureService.create(
      createSyllabusSubStructureDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get a syllabus-sub-structure' })
  findAll() {
    return this.syllabusSubStructureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Create a syllabus-sub-structure by id' })
  findOne(@Param('id') id: string) {
    return this.syllabusSubStructureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a syllabus-sub-structure by id' })
  update(
    @Param('id') id: string,
    @Body() updateSyllabusSubStructureDto: UpdateSyllabusSubStructureDto,
  ) {
    return this.syllabusSubStructureService.update(
      id,
      updateSyllabusSubStructureDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a syllabus-sub-structure by id' })
  remove(@Param('id') id: string) {
    return this.syllabusSubStructureService.remove(id);
  }
}
