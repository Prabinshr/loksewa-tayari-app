import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/helpers/decorator/current-user.decorator';
import { User } from 'src/user/entities';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponseProperty({ type: User })
  async getProfile(@CurrentUser() currentUser) {
    return await this.userService.findOne(currentUser.id);
  }
}
