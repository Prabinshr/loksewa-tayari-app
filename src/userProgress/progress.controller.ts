import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProgressService } from './progress.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserProgressDto, UpdateUserProgressDto } from './dto';

@ApiTags('User Progress')
@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Post()
  create(
    @Body('progress') createUserProgressDto: CreateUserProgressDto,
    @Body('quiz_id') quiz_id: string,
    @Body('user_id') user_id: string,
  ) {
    return this.userProgressService.create(
      createUserProgressDto,
      quiz_id,
      user_id,
    );
  }

  @Get()
  findAll() {
    return this.userProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserProgressDto: UpdateUserProgressDto,
  ) {
    return this.userProgressService.update(id, updateUserProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProgressService.remove(id);
  }
}
