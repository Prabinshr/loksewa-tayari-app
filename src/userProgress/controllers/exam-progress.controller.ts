import {
  Controller,
  Get,
  UseGuards,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserExamProgressService } from '../services/exam-progress.services';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateExamProgressDto } from '../dto';

@ApiTags('User Exam Progress')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('exam-progress')
export class UserExamProgressController {
  constructor(
    private readonly userExamProgressService: UserExamProgressService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Exam Progress' })
  create(@Body() createExamProgressDto: CreateExamProgressDto) {
    return this.userExamProgressService.create(createExamProgressDto);
  }

  // ALL EXAM PROGRESS
  @Get()
  @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Get All Attempted Exam Sets Progress' })
  findAll(@CurrentUser() user) {
    return this.userExamProgressService.findAll(user['id']);
  }

  @Get(':subService')
  @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: "Get Specific SubService's Attempted Exam Sets" })
  findOne(@CurrentUser() user, @Param('subService') subService: string) {
    return this.userExamProgressService.findOne(user['id'], subService);
  }

  @Patch()
  @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Update Attempted Exam Sets (IN PROGRESS)' })
  update() {
    return this.userExamProgressService.update();
  }

  @Delete()
  @Roles(Role.ADMIN, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Update Attempted Exam Sets (IN PROGRESS)' })
  remove() {
    return this.userExamProgressService.remove();
  }
}
