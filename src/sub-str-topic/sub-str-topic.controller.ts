import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SubStrTopicService } from './sub-str-topic.service';
import { CreateSubStrTopicDto } from './dto/create-sub-str-topic.dto';
import { UpdateSubStrTopicDto } from './dto/update-sub-str-topic.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('subStrTopic')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('sub-str-topic')
export class SubStrTopicController {
  constructor(private readonly subStrTopicService: SubStrTopicService) {}

  @Post()
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Create a new Sub-structure-topic' })
  create(@Body() createSubStrTopicDto: CreateSubStrTopicDto) {
    return this.subStrTopicService.create(createSubStrTopicDto);
  }

  //upload image
  @Post('upload')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'substrtopic',
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
      substrtopic?: Express.Multer.File[];
    },
  ): object {
    console.log(file);
    return {
      message: 'File Upload successful.',
    };
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get all Sub-structure-topics' })
  findAll() {
    return this.subStrTopicService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Find a Sub-structure-topic by id' })
  findOne(@Param('id') id: string) {
    return this.subStrTopicService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Update a Sub-structure-topic by id' })
  update(
    @Param('id') id: string,
    @Body() updateSubStrTopicDto: UpdateSubStrTopicDto,
  ) {
    return this.subStrTopicService.update(id, updateSubStrTopicDto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Delete a Sub-structure-topic by id' })
  remove(@Param('id') id: string) {
    return this.subStrTopicService.remove(id);
  }
}
