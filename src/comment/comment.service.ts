import { HttpException, Injectable } from '@nestjs/common';
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

  update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      return this.prisma.comments.update({
        data: updateCommentDto,
        where: { id },
      });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.comments.delete({ where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
