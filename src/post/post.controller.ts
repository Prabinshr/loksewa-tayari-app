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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Post')
@UseGuards(RolesGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post(':forumId')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Create Post' })
  create(
    @CurrentUser() me: Express.User,
    @Param('forumId') forumId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    // Assigning User Id & Forum Id
    createPostDto.userId = me['id'];
    createPostDto.forumId = forumId;

    return this.postService.create(createPostDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get All Posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get Post By Id' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Update Post' })
  update(
    @CurrentUser() me: Express.User,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const userId = me['id'];
    return this.postService.update(id, userId, updatePostDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Delete Post' })
  remove(@CurrentUser() me: Express.User, @Param('id') id: string) {
    const userId = me['id'];
    return this.postService.remove(id, userId);
  }
}
