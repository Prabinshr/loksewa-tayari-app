import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get(':sewaService/:subService/examsets/:mock?')
  findAll(
    @Param('sewaService') sewaService: string,
    @Param('subService') subService: string,
    @Param('mock') mock: number,
  ) {
    return this.examsService.findAllSets(sewaService, subService, mock);
  }
}
