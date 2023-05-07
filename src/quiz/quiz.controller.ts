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
import { QuizService } from './quiz.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuizDto, UpdateQuizDto } from './dto/';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('quiz')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  // @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @Roles(Role.USER)
  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  // @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @Roles(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
