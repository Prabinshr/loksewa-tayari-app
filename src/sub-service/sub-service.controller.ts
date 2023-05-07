import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SubServiceService } from './sub-service.service';
import { CreateSubServiceDto } from './dto/create-sub-service.dto';
import { UpdateSubServiceDto } from './dto/update-sub-service.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@ApiTags('subservice')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('sub-service')
export class SubServiceController {
  constructor(private readonly subServiceService: SubServiceService) {}

  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Post()
  @ApiOperation({ summary: 'Create a new SubService' })
  create(@Body() createSubServiceDto: CreateSubServiceDto) {
    return this.subServiceService.create(createSubServiceDto);
  }

  //upload image
  @Post('upload')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'subservice',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: './images',
          filename: (req, file, callback) => {
            console.log(file);

            const filename = file.originalname;
            const ext = extname(file.originalname);
            callback(null, `${filename}${ext}`);
          },
        }),
      },
    ),
  )
  uploadFiles(
    @UploadedFiles()
    file: {
      subservice?: Express.Multer.File[];
    },
  ): object {
    console.log(file);
    return {
      message: 'File Upload successful.',
    };
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get all SubServices' })
  findAll() {
    return this.subServiceService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get a SubService by id' })
  findOne(@Param('id') id: string) {
    return this.subServiceService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Update a SubService' })
  update(
    @Param('id') id: string,
    @Body() updateSubServiceDto: UpdateSubServiceDto,
  ) {
    return this.subServiceService.update(id, updateSubServiceDto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Delete a SubService' })
  remove(@Param('id') id: string) {
    return this.subServiceService.remove(id);
  }
}
