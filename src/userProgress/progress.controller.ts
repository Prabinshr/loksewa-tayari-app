import {
  Controller,
  Get,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserProgressService } from './progress.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role, User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('User Progress')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  // TODO: Only done by the system. So, not exposing it to the user.
  // @Post()
  // create(
  //   @Body('progress') createUserProgressDto: CreateUserProgressDto,
  //   @Body('quiz_id') quiz_id: string,
  //   @Body('user_id') user_id: string,
  // ) {
  //   return this.userProgressService.create(
  //     createUserProgressDto,
  //     quiz_id,
  //     user_id,
  //   );
  // }
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get User-Progress.' })
  @Get()
  findAll() {
    return this.userProgressService.findAll();
  }

  // @Roles(Role.SUBSCRIBED_USER, Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get User-Progress by id.' })
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    if (user.role === Role.ADMIN || user.id === id) {
      return this.userProgressService.findOne(id);
    }
    throw new ForbiddenException("You don't have access to this resource");
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserProgressDto: UpdateUserProgressDto,
  // ) {
  //   return this.userProgressService.update(id, updateUserProgressDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userProgressService.remove(id);
  // }

  // EXAM PROGRESS
  @Get('exam/hello')
  @Roles(Role.USER)
  findExamProgress(@CurrentUser() user) {
    return this.userProgressService.findExamProgress(user['id']);
  }

  @Get('exam/progress')
  find() {
    return this.userProgressService.exam();
  }
}
