import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SewaserviceService } from './sewaservice.service';
import { CreateSewaserviceDto } from './dto/create-sewaservice.dto';
import { UpdateSewaserviceDto } from './dto/update-sewaservice.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('sewaservice')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('sewaservice')
export class SewaserviceController {
  constructor(private readonly sewaserviceService: SewaserviceService) {}

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new sewaservive' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The sewaservice has been successfully created.',
  // })
  create(@Body() createSewaserviceDto: CreateSewaserviceDto) {
    return this.sewaserviceService.create(createSewaserviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all sewaservive' })
  findAll() {
    return this.sewaserviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a sewaservive by id' })
  findOne(@Param('id') id: number) {
    return this.sewaserviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a sewaservive' })
  update(
    @Param('id') id: number,
    @Body() updateSewaserviceDto: UpdateSewaserviceDto,
  ) {
    return this.sewaserviceService.update(+id, updateSewaserviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a sewaservive' })
  remove(@Param('id') id: number) {
    return this.sewaserviceService.remove(+id);
  }
}
