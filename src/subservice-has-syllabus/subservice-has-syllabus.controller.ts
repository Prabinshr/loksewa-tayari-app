import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubserviceHasSyllabusService } from './subservice-has-syllabus.service';
import { CreateSubserviceHasSyllabusDto } from './dto/create-subservice-has-syllabus.dto';
import { UpdateSubserviceHasSyllabusDto } from './dto/update-subservice-has-syllabus.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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

  @Roles(Role.ADMIN)
  @Post()
  create(
    @Body() createSubserviceHasSyllabusDto: CreateSubserviceHasSyllabusDto,
  ) {
    return this.subserviceHasSyllabusService.create(
      createSubserviceHasSyllabusDto,
    );
  }

  @Get()
  findAll() {
    return this.subserviceHasSyllabusService.findAll();
  }

  @Get(':service_id')
  findOne(@Param('service_id') service_id: number) {
    return this.subserviceHasSyllabusService.findOne(+service_id);
  }

  @Patch(':service_id')
  update(
    @Param('service_id') service_id: number,
    @Body() updateSubserviceHasSyllabusDto: UpdateSubserviceHasSyllabusDto,
  ) {
    return this.subserviceHasSyllabusService.update(
      +service_id,
      updateSubserviceHasSyllabusDto,
    );
  }

  @Delete(':service_id')
  remove(@Param('service_id') service_id: number) {
    return this.subserviceHasSyllabusService.remove(+service_id);
  }
}