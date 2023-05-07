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
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { Forum } from './entities/forum.entity';

@ApiTags('Forum')
@ApiBearerAuth('jwt')
@Controller('forum')
@UseGuards(RolesGuard)
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Create New Forum' })
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Get()
  // @Roles(Role.ADMIN, Role.USER, Role.SUBSCRIBED_USER)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get All Forums' })
  findAll() {
    return this.forumService.findAll();
  }

  @Get(':id')
  // @Roles(Role.ADMIN, Role.USER, Role.SUBSCRIBED_USER)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get Forum By Forum ID' })
  findOne(@Param('id') id: string) {
    return this.forumService.findOne(id);
  }

  @Patch(':id')
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Update Forum' })
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumService.update(id, updateForumDto);
  }

  @Delete(':id')
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Delete Forum' })
  remove(@Param('id') id: string) {
    return this.forumService.remove(id);
  }
}
