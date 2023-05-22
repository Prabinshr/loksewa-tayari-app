import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  // Getting Specific SubService Exam Sets
  async findAllSets(sewaService: string, subService: string, mock: number) {
    try {
      // Checking If SewaService & SubService Are Related Or Not
      const { id, ...sewas } = await this.prisma.sewaService.findFirst({
        where: { title: sewaService.toUpperCase() },
      });

      const { sewaService_id, ...subServ } =
        await this.prisma.subService.findFirst({
          where: {
            title: subService.toUpperCase(),
          },
        });

      if (!(id === sewaService_id))
        throw new HttpException('Invalid Sub Service', HttpStatus.BAD_REQUEST);

      // Getting ExamSets Using SubService's ID
      const filteredCondition = {
        subService_id: subServ.id,
      };

      if (mock) {
        filteredCondition['mock'] = mock;

        return await this.prisma.examSet.findMany({
          where: filteredCondition,
          include: { examCategories: { include: { questions: true } } },
        });
      }

      return await this.prisma.examSet.findMany({
        where: filteredCondition,
      });
    } catch (e) {
      throw new HttpException(
        'Something Went Wrong Finding SubService Exam Sets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
