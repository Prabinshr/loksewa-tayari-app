import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/entities';
import { Public } from 'src/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Public()
  getHello() {
    return this.appService.getServerDetails();
  }

  @ApiBearerAuth('jwt')
  @ApiResponseProperty({ type: User })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR, Role.SUBSCRIBED_USER, Role.USER)
  @Get('me')
  async getProfile(@CurrentUser() currentUser: User) {
    console.log(currentUser)
    return await this.userService.findOne(currentUser.id);
  }
}
