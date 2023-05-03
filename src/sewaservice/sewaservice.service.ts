import { HttpException, Injectable } from '@nestjs/common';
import { CreateSewaserviceDto } from './dto/create-sewaservice.dto';
import { UpdateSewaserviceDto } from './dto/update-sewaservice.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SewaserviceService {
  constructor(private prismaService: PrismaService) {}
  create(createSewaserviceDto: CreateSewaserviceDto) {
    try{
 return this.prismaService.sewaService.create({
      data: createSewaserviceDto,
    });
    }
    catch(error){
      throw new HttpException('SewaService creation failed',404)
    }
   
  }

  findAll() {
    // return this.prismaService.sewaService.findMany()
    try {
      return this.prismaService.sewaService.findMany({include: {
        subServices: {
          include: {
            subserviceHasSyllabus: true,
          }
        }
      }});
    } catch (error) {
      throw new HttpException('Cannot find SewaServices', 404);
    }
  }

  // findOne(id: number) {
  //   return this.prismaService.sewaService.findUnique({where: {id: id}})
  // }
  findOne(id: string) {
    try {
      return this.prismaService.sewaService.findFirst({
        where: {
          id: id,
        },
        include: {
          subServices: true,
        },
      });
    } catch (error) {
      throw new HttpException('SewaService not found', 404);
    }
  }

  update(id: string, updateSewaserviceDto: UpdateSewaserviceDto) {
    try {
      return this.prismaService.sewaService.update({
        data: updateSewaserviceDto,
        where: { id },
      });
    } catch (error) {
      throw new HttpException('SewaService update failed', 400);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.sewaService.delete({ where: { id } });
    } catch (error) {
      throw new HttpException('SewaService deletion failed', 400);
    }
  }
}
