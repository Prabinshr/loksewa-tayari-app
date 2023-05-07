import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SyllabusStructureService } from './syllabus-structure.service';
import { CreateSyllabusStructureDto } from './dto/create-syllabus-structure.dto';
import { UpdateSyllabusStructureDto } from './dto/update-syllabus-structure.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('syllabusStructure')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('syllabus-structure')
export class SyllabusStructureController {
  constructor(
    private readonly syllabusStructureService: SyllabusStructureService,
  ) {}

  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Post()
  @ApiOperation({ summary: 'Create a new syllabus-structure' })
  create(@Body() createSyllabusStructureDto: CreateSyllabusStructureDto) {
    return this.syllabusStructureService.create(createSyllabusStructureDto);
  }

  //upload image
  @Post('upload')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'syllabusstructure',
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
      syllabusstructure?: Express.Multer.File[];
    },
  ): object {
    console.log(file);
    return {
      message: 'File Upload successful.',
    };
  }
  
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Get()
  @ApiOperation({ summary: 'Get all syllabus-structure' })
  findAll() {
    return this.syllabusStructureService.findAll();
  }

  @Roles(Role.USER)
  @Get(':id')
  @ApiOperation({ summary: 'Get a syllabus-structure by id' })
  findOne(@Param('id') id: string) {
    return this.syllabusStructureService.findOne(id);
  }

  @Roles(Role.USER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a syllabus-structure' })
  update(
    @Param('id') id: string,
    @Body() updateSyllabusStructureDto: UpdateSyllabusStructureDto,
  ) {
    return this.syllabusStructureService.update(id, updateSyllabusStructureDto);
  }

  @Roles(Role.USER)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a syllabus-structure' })
  remove(@Param('id') id: string) {
    return this.syllabusStructureService.remove(id);
  }
}
