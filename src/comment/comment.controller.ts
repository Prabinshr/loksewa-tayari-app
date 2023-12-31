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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role, User } from '@prisma/client';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Comment')
@UseGuards(RolesGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Comment On Post' })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string,
    @CurrentUser() me: User,
  ) {
    // Assigning User Id & Post Id & Creator Name & Creator Profile
    createCommentDto.userId = me.id;
    createCommentDto.postId = postId;
    createCommentDto.creator_name = `${me['first_name']} ${me['last_name']}`;
    createCommentDto.creator_profile = `${me['image']}`;

    return this.commentService.create(createCommentDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get All Comments' })
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get Comment By Comment Id' })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Update Comment' })
  update(
    @CurrentUser() me: Express.User,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = me['id'];
    return this.commentService.update(id, userId, updateCommentDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @Roles(Role.ADMIN, Role.USER, Role.MODERATOR, Role.SUBSCRIBED_USER)
  @ApiOperation({ summary: 'Delete Comment' })
  remove(@CurrentUser() me: Express.User, @Param('id') id: string) {
    const userId = me['id'];
    return this.commentService.remove(id, userId);
  }
}
