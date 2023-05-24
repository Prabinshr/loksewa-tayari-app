import { HttpException, Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Forum } from './entities/forum.entity';

@Injectable()
export class ForumService {
  constructor(private prisma: PrismaService) {}

  create(createForumDto: CreateForumDto) {
    try {
      return this.prisma.forum.create({ data: createForumDto });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findAll() {
    try {
      return this.prisma.forum.findMany({
        include: { posts: true },
      });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.forum.findUnique({
        where: { id },
        include: { posts: true },
      });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  update(id: string, updateForumDto: UpdateForumDto) {
    try {
      return this.prisma.forum.update({ data: updateForumDto, where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.forum.delete({ where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
