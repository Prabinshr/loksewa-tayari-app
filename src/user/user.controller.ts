import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { User } from './entities';

@ApiTags('User')
@ApiBearerAuth('jwt')
@Controller('user')
@UseGuards(RolesGuard)
// @Roles(Role.ADMIN)
@Roles(Role.USER)

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id/role')
  changeRole(@Param('id') id: string, @Body('role') role: Role) {
    return this.userService.changeRole(id, role);
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  // Generate a findAll method that takes a page and limit as optional query parameter
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    page = parseInt(page?.toString()) || 1;
    limit = parseInt(limit?.toString()) || 10;
    if ((page > 100 || page < 1) && (limit > 100 || limit < 10)) {
      throw new BadRequestException(
        'Page and limit must be greater than 10 and less than 100',
      );
    }
    return this.userService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
