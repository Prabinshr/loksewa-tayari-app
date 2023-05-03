import { HttpException, Injectable } from '@nestjs/common';
import { CreateSyllabusStructureDto } from './dto/create-syllabus-structure.dto';
import { UpdateSyllabusStructureDto } from './dto/update-syllabus-structure.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SyllabusStructureService {
  constructor(private prismaService: PrismaService) {}
  create(createSyllabusStructureDto: CreateSyllabusStructureDto) {
    try {
      return this.prismaService.syllabusStructure.create({
        data: createSyllabusStructureDto,
      });
    } catch (error) {
      throw new HttpException('Cannot create syllabus-structure', 404);
    }
  }

  findAll() {
    try {
      return this.prismaService.syllabusStructure.findMany({
        include: {
          syllabusSubStructures: {
            include: {
              subStrTopics: {
                include: {
                  questionSets: {
                    include: {
                      questions: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException('Cannot find all syllabus-structure', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.syllabusStructure.findUnique({
        include: {
          syllabusSubStructures: {
            include: {
              subStrTopics: {
                include: {
                  questionSets: {
                    include: {
                      questions: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: { id: id },
      });
    } catch (error) {
      throw new HttpException('Cannot find unique syllabus-structure', 404);
    }
  }

  update(id: string, updateSyllabusStructureDto: UpdateSyllabusStructureDto) {
    try {
      return this.prismaService.syllabusStructure.update({
        where: { id },
        data: updateSyllabusStructureDto,
      });
    } catch (error) {
      throw new HttpException('Cannot update syllabus-structure by id', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.syllabusStructure.delete({ where: { id } });
    } catch (error) {
      throw new HttpException('Cannot remove syllabus-structure by id', 404);
    }
  }
}
