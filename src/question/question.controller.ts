import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { Role, User } from '@prisma/client';
import { CurrentUser } from 'src/helpers/decorator/current-user.decorator';
@ApiTags('Question')
@Controller('question')
@ApiBearerAuth("jwt")
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER, Role.SUBSCRIBED_USER)
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    const quizQuestion = this.questionService.findOne(id);
    // if(quizQuestion.quiz.cost >=0 && user.type === Role.USER){
    //   throw new ForbiddenException("You don't have access to this question.");
    // }
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
