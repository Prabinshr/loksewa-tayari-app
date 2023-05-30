import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Dynamic SubService's Exam Set")
@ApiBearerAuth('jwt')
@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @ApiOperation({ summary: "Gets Specific SubService's Exam Set" })
  @Get(':sewaService/:subService/examsets/:mock?')
  findAll(
    @Param('sewaService') sewaService: string,
    @Param('subService') subService: string,
    @Param('mock') mock?: number,
  ) {
    return this.examsService.findAllSets(sewaService, subService, mock);
  }

  @ApiOperation({ summary: "Gets Specific SewaService's Forum's Post" })
  @Get(':sewaService/forum/posts/:postId?')
  findForumPost(
    @Param('sewaService') sewaService: string,
    @Param('postId') postId: string,
  ) {
    return this.examsService.findForumPost(sewaService, postId);
  }
}
