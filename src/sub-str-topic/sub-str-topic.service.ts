import { HttpException, Injectable } from '@nestjs/common';
import { CreateSubStrTopicDto } from './dto/create-sub-str-topic.dto';
import { UpdateSubStrTopicDto } from './dto/update-sub-str-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubStrTopicService {
  constructor(private prismaService: PrismaService) {}
  create(createSubStrTopicDto: CreateSubStrTopicDto) {
    try {
      return this.prismaService.subStrTopic.create({
        data: createSubStrTopicDto,
      });
    } catch (err) {
      throw new HttpException('Cannot create new sub structure topic', 404);
    }
  }

  async uploadSubStrTopicImage(
    id: string,
    subStrTopicImage: Express.Multer.File,
  ) {
    try {
      console.log(subStrTopicImage);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
  findAll() {
    try {
      return this.prismaService.subStrTopic.findMany({
        include: {
          questionSets: true,
        },
      });
    } catch (err) {
      throw new HttpException('Cannot find all sub structure topics', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.subStrTopic.findUnique({
        where: { id: id },
        include: {
          questionSets: true,
        },
      });
    } catch (err) {
      throw new HttpException('Cannot find one sub structure topic by id', 404);
    }
  }

  update(id: string, updateSubStrTopicDto: UpdateSubStrTopicDto) {
    try {
      return this.prismaService.subStrTopic.update({
        data: updateSubStrTopicDto,
        where: { id: id },
      });
    } catch (err) {
      throw new HttpException('Cannot update a sub structure topic by id', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.subStrTopic.delete({ where: { id: id } });
    } catch (err) {
      throw new HttpException('Cannot delete a sub structure topic by id', 404);
    }
  }
}
