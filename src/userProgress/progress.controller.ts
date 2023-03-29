import {
  Controller,
  Get,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserProgressService } from './progress.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { Role, User } from '@prisma/client';
import { CurrentUser } from 'src/helpers/decorator/current-user.decorator';

@ApiTags('User Progress')
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userProgressService.findAll();
  }

  @Roles(Role.SUBSCRIBED_USER, Role.ADMIN)
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
}
