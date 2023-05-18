import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  BadRequestException,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { User } from './entities';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { SharpPipe } from './pipes';
import { Response } from 'express';
import { join } from 'path';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('User')
@ApiBearerAuth('jwt')
@Controller('user')
@UseGuards(RolesGuard)
// @Roles(Role.ADMIN)
@Roles(Role.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update user role by id.' })
  changeRole(@Param('id') id: string, @Body('role') role: Role) {
    return this.userService.changeRole(id, role);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user.' })
  @ApiCreatedResponse({ type: User })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  //upload image
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: memoryStorage(),
    }),
  )
  async uploadProfileImage(
    @CurrentUser() user,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ })
        .addMaxSizeValidator({
          maxSize: 5242880,
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
      SharpPipe,
    )
    profile: Express.Multer.File,
  ) {
    console.log(user);
    console.log('Hello');

    return await this.userService.uploadUserImage(user, profile);
  }

  // Getting Profile Image
  @Get('profile-image/:imageName')
  @ApiOperation({ summary: 'Get Profile Image of The User' })
  @ApiResponse({ status: 201, description: 'Get Profile Image Of The User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getProfileImage(@Param('imageName') imageName: string, @Res() res: Response) {
    return res.sendFile(
      join(process.cwd(), `uploads/profile-pictures/${imageName}`),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get users.' })
  // Generate a findAll method that takes a page and limit as optional query parameter
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    page = parseInt(page?.toString()) || 1;
    limit = parseInt(limit?.toString()) || 10;
    if ((page > 100 || page < 1) && (limit > 100 || limit < 10)) {
      throw new BadRequestException(
        'Page and limit must be greater than 10 and less than 100',
      );
    }
    return this.userService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
