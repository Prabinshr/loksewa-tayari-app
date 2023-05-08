import { HttpException, Injectable } from '@nestjs/common';
import { CreateSubServiceDto } from './dto/create-sub-service.dto';
import { UpdateSubServiceDto } from './dto/update-sub-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubServiceService {
  constructor(private prismaService: PrismaService) {}
  create(createSubServiceDto: CreateSubServiceDto) {
    try {
      return this.prismaService.subService.create({
        data: createSubServiceDto,
      });
    } catch (err) {
      throw new HttpException('Cannot create new sub service', 404);
    }
  }

  async uploadSubServiceImage(
    id: string,
    subServiceImage: Express.Multer.File,
  ) {
    try {
      console.log(subServiceImage);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findAll() {
    try {
      return this.prismaService.subService.findMany({});
    } catch (err) {
      throw new HttpException('Cannot find', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.subService.findUnique({ where: { id: id } });
    } catch (err) {
      throw new HttpException('Cannot find', 404);
    }
  }

  update(id: string, updateSubServiceDto: UpdateSubServiceDto) {
    try {
      return this.prismaService.subService.update({
        where: { id },
        data: updateSubServiceDto,
      });
    } catch (err) {
      throw new HttpException('Cannot update', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.subService.delete({ where: { id: id } });
    } catch (err) {
      throw new HttpException('Cannot delete', 404);
    }
  }
}