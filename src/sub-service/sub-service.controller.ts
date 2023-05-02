import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubServiceService } from './sub-service.service';
import { CreateSubServiceDto } from './dto/create-sub-service.dto';
import { UpdateSubServiceDto } from './dto/update-sub-service.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('subservice')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('sub-service')
export class SubServiceController {
  constructor(private readonly subServiceService: SubServiceService) {}

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new SubService' })
  create(@Body() createSubServiceDto: CreateSubServiceDto) {
    return this.subServiceService.create(createSubServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all SubServices' })
  findAll() {
    return this.subServiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a SubService by id' })
  findOne(@Param('id') id: string) {
    return this.subServiceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a SubService' })
  update(
    @Param('id') id: string,
    @Body() updateSubServiceDto: UpdateSubServiceDto,
  ) {
    return this.subServiceService.update(id, updateSubServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a SubService' })
  remove(@Param('id') id: string) {
    return this.subServiceService.remove(id);
  }
}
