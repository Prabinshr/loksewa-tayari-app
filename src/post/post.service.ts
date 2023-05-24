import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    try {
      return this.prismaService.post.create({ data: createPostDto });
    } catch (e) {
      throw new HttpException(
        'Something Went Wrong Creating Post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    try {
      return this.prismaService.post.findMany({ include: { comments: true } });
    } catch (e) {
      throw new HttpException(
        'Something Went Wrong Finding Post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id,
        },
        include: { comments: true },
      });
      if (!post)
        throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);

      return post;
    } catch (e) {
      throw new HttpException(
        'Something Went Wrong Finding The Post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto) {
    try {
      // Checking If The Post Is User's Or Not
      const post = await this.prismaService.post.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!post)
        throw new HttpException(
          'You Cannot Update This Post',
          HttpStatus.FORBIDDEN,
        );

      // Update The Post
      return this.prismaService.post.update({
        where: {
          id,
        },
        data: updatePostDto,
      });
    } catch (e) {
      throw new HttpException(
        'You Cannot Update This Post',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async remove(id: string, userId: string) {
    try {
      // Checking If The Post Is User's Or Not
      const post = await this.prismaService.post.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!post)
        throw new HttpException(
          'You Cannot Delete This Post',
          HttpStatus.FORBIDDEN,
        );

      // Delete The Post
      return this.prismaService.post.delete({ where: { id } });
    } catch (e) {
      throw new HttpException(
        'You Cannot Delete This Post',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
