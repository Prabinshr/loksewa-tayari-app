import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    try {
      return this.prisma.comments.create({ data: createCommentDto });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findAll() {
    try {
      return this.prisma.comments.findMany();
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.comments.findUnique({ where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async update(id: string, userId: string, updateCommentDto: UpdateCommentDto) {
    try {
      // Checking If The Comment Is User's Or Not
      const comment = await this.prisma.comments.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!comment)
        throw new HttpException(
          'You Cannot Update This Post',
          HttpStatus.FORBIDDEN,
        );

      // Update The Comment
      return this.prisma.comments.update({
        data: updateCommentDto,
        where: { id },
      });
    } catch (err) {
      throw new HttpException(
        'You Cannot Update This Comment',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async remove(id: string, userId: string) {
    try {
      // Checking If The Comment Is User's Or Not
      const comment = await this.prisma.comments.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!comment)
        throw new HttpException(
          'You Cannot Delete This Comment',
          HttpStatus.FORBIDDEN,
        );

      // Delete The Comment
      return await this.prisma.comments.delete({ where: { id } });
    } catch (err) {
      throw new HttpException(
        'You Cannot Delete This Comment',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
