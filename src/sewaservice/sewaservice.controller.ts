import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SewaserviceService } from './sewaservice.service';
import { CreateSewaserviceDto } from './dto/create-sewaservice.dto';
import { UpdateSewaserviceDto } from './dto/update-sewaservice.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('sewaservice')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('sewaservice')
export class SewaserviceController {
  constructor(private readonly sewaserviceService: SewaserviceService) {}

  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Post()
  @ApiOperation({ summary: 'Create a new sewaservive' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The sewaservice has been successfully created.',
  // })
  create(@Body() createSewaserviceDto: CreateSewaserviceDto) {
    return this.sewaserviceService.create(createSewaserviceDto);
  }

  //upload image
  @Post('upload')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'sewaservice',
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
      sewaService?: Express.Multer.File[];
    },
  ): object {
    console.log(file);
    return {
      message: 'File Upload successful.',
    };
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'get all sewaservive' })
  findAll() {
    return this.sewaserviceService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'get a sewaservive by id' })
  findOne(@Param('id') id: string) {
    return this.sewaserviceService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'update a sewaservive' })
  update(
    @Param('id') id: string,
    @Body() updateSewaserviceDto: UpdateSewaserviceDto,
  ) {
    return this.sewaserviceService.update(id, updateSewaserviceDto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'delete a sewaservive' })
  remove(@Param('id') id: string) {
    return this.sewaserviceService.remove(id);
  }
}
