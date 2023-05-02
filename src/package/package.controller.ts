import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('package')
@ApiBearerAuth('jwt')
@Controller('user')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
  //   return this.packageService.update(+id, updatePackageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.packageService.remove(+id);
  // }
}
