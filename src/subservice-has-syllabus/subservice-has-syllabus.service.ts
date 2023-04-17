import { HttpException, Injectable } from '@nestjs/common';
import { CreateSubserviceHasSyllabusDto } from './dto/create-subservice-has-syllabus.dto';
import { UpdateSubserviceHasSyllabusDto } from './dto/update-subservice-has-syllabus.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubserviceHasSyllabusService {
  constructor(private prismaService: PrismaService) {}
  create(createSubserviceHasSyllabusDto: CreateSubserviceHasSyllabusDto) {
    try {
      return this.prismaService.subserviceHasSyllabus.create({
        data: createSubserviceHasSyllabusDto,
      });
    } catch (err) {
      throw new HttpException('Cannot create new SubserviceHasSyllabus', 404);
    }
  }

  findAll() {
    try {
      return this.prismaService.subserviceHasSyllabus.findMany();
    } catch (err) {
      throw new HttpException('Cannot find alla SubserviceHasSyllabus', 404);
    }
  }

  findOne(service_id: number) {
    try {
      return this.prismaService.subserviceHasSyllabus.findUnique({
        where: { service_id: service_id },
      });
    } catch (err) {
      throw new HttpException('Cannot find one SubserviceHasSyllabus by id', 404);
    }
  }

  update(
    service_id: number,
    updateSubserviceHasSyllabusDto: UpdateSubserviceHasSyllabusDto,
  ) {
    try {
      return this.prismaService.subserviceHasSyllabus.update({
        data: updateSubserviceHasSyllabusDto,
        where: { service_id },
      });
    } catch (err) {
      throw new HttpException('Cannot update SubserviceHasSyllabus', 404);
    }
  }

  remove(service_id: number) {
    try {
      return this.prismaService.subserviceHasSyllabus.delete({
        where: { service_id },
      });
    } catch (err) {
      throw new HttpException('Cannot delete SubserviceHasSyllabus', 404);
    }
  }
}
