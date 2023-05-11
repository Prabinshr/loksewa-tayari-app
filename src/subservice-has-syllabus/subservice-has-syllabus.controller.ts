import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubserviceHasSyllabusService } from './subservice-has-syllabus.service';
import { CreateSubserviceHasSyllabusDto } from './dto/create-subservice-has-syllabus.dto';
import { UpdateSubserviceHasSyllabusDto } from './dto/update-subservice-has-syllabus.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';

@ApiTags('SubserviceHasSyllabus')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('subservice-has-syllabus')
export class SubserviceHasSyllabusController {
  constructor(
    private readonly subserviceHasSyllabusService: SubserviceHasSyllabusService,
  ) {}

  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Post()
  @ApiOperation({ summary: 'Create subservice-has-syllabus.' })
  create(
    @Body() createSubserviceHasSyllabusDto: CreateSubserviceHasSyllabusDto,
  ) {
    return this.subserviceHasSyllabusService.create(
      createSubserviceHasSyllabusDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get subservice-has-syllabuses.' })
  @Roles(Role.USER)
  findAll() {
    return this.subserviceHasSyllabusService.findAll();
  }

  @Get(':service_id')
  @ApiOperation({ summary: 'Get subservice-has-syllabus by id.' })
  @Roles(Role.USER)
  findOne(@Param('service_id') service_id: string) {
    return this.subserviceHasSyllabusService.findOne(service_id);
  }

  @Patch(':service_id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Update subservice-has-syllabus by id.' })
  update(
    @Param('service_id') service_id: string,
    @Body() updateSubserviceHasSyllabusDto: UpdateSubserviceHasSyllabusDto,
  ) {
    return this.subserviceHasSyllabusService.update(
      service_id,
      updateSubserviceHasSyllabusDto,
    );
  }

  @Delete(':service_id')
  @ApiOperation({ summary: 'Delete subservice-has-syllabus by id.' })
  @Roles(Role.USER)
  remove(@Param('service_id') service_id: string) {
    return this.subserviceHasSyllabusService.remove(service_id);
  }
}
