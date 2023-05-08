import { HttpException, Injectable } from '@nestjs/common';
import { CreateSyllabusSubStructureDto } from './dto/create-syllabus-sub-structure.dto';
import { UpdateSyllabusSubStructureDto } from './dto/update-syllabus-sub-structure.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SyllabusSubStructureService {
  constructor(private prismaService: PrismaService){}
  create(createSyllabusSubStructureDto: CreateSyllabusSubStructureDto) {
    try{
      return this.prismaService.syllabusSubStructure.create({data: createSyllabusSubStructureDto})
    }catch(err){
      throw new HttpException('Cannot create a Syllabus Sub structure',404)
    }
  }


    async uploadSyllabusSubStructureImage(
    id: string,
    syllabusSubStructureImage: Express.Multer.File,
  ) {
    try {
      console.log(syllabusSubStructureImage);
      // const uploadImage = await this.prisma.sewaService.update({where:{id},data:{image:`/land/image/${String{landImage}}`}})
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findAll() {
    try {
      return this.prismaService.syllabusSubStructure.findMany({
        include: {
          subStrTopics: {
            include: {
              questionSets: {
                include: {
                  questions: true,
                }
              }
            }
          },
        },
      });
    } catch (err) {
      throw new HttpException('Cannot find syllabus sub structures', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.syllabusSubStructure.findUnique({
        include: {
          subStrTopics: {
            include: {
              questionSets: {
                include:{
                  questions : true
                }
              }
            }
          },
        },
        where: { id: id },
      });
    } catch (err) {
      throw new HttpException('Cannot find syllabus sub structure by id', 404);
    }
  }

  update(id: string, updateSyllabusSubStructureDto: UpdateSyllabusSubStructureDto) {
    try {
      return this.prismaService.syllabusSubStructure.update({data: updateSyllabusSubStructureDto,where:{id}})
    } catch (err) {
      throw new HttpException('Cannot update syllabus sub structure by id', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.syllabusSubStructure.delete({where:{id: id}})
    } catch (err) {
      throw new HttpException('Cannot delete syllabus sub structure by id', 404);
    }
  }
}
