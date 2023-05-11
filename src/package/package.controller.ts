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
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('package')
@Controller('package')
@ApiBearerAuth('jwt')
@Controller('user')
@UseGuards(RolesGuard)
// @Roles(Role.ADMIN)
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  @ApiOperation({ summary: 'Create Package.' })
  @Roles(Role.USER)
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Post('/apply')
  @ApiOperation({ summary: 'Apply Package.' })
  @Roles(Role.USER)
  async applyPackage(
    @Body('transactionId') transactionId: string,
    @Body('package_title') package_title: string,
  ): Promise<void> {
    await this.packageService.applyPackage(transactionId, package_title);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Packages.' })
  @Roles(Role.USER)
  findAll() {
    return this.packageService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.packageService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
  //   return this.packageService.update(+id, updatePackageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.packageService.remove(+id);
  // }
}
