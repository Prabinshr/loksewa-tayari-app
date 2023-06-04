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
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Forum')
@Controller('forum')
@UseGuards(RolesGuard)
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create New Forum' })
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get All Forums' })
  findAll() {
    return this.forumService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get Forum By Forum ID' })
  findOne(@Param('id') id: string) {
    return this.forumService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Update Forum' })
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumService.update(id, updateForumDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Delete Forum' })
  remove(@Param('id') id: string) {
    return this.forumService.remove(id);
  }
}
