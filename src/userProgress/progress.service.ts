import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserProgressDto, UpdateUserProgressDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProgressService {
  constructor(private prisma: PrismaService) {}
  async create(
    createUserProgressDto: CreateUserProgressDto,
    quiz_id: string,
    user_id: string,
  ) {
    try {
      return await this.prisma.user_Progress.create({
        data: {
          ...createUserProgressDto,
          quiz_id,
          user_id,
        },
      });
    } catch (error) {
      throw new HttpException('Error creating user progress', 500);
    }
  }

  findAll() {
    try {
      return this.prisma.user_Progress.findMany({
        include: {
          user: true,
          quiz: true,
        },
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.user_Progress.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
          quiz: true,
        },
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }

  update(id: string, UpdateUserProgressDto: UpdateUserProgressDto) {
    try {
      return this.prisma.user_Progress.update({
        where: {
          id: id,
        },
        data: UpdateUserProgressDto,
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.user_Progress.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('User Progress not found', 404);
    }
  }

  // EXAM PROGRESS
  async findExamProgress(id: string) {
    // Finding SubServices The User Has Enrolled
    const { subServices } = await this.prisma.user.findUnique({
      where: { id },
      include: { subServices: true },
    });

    // subServices
    //   [
    //     {
    //         "id": "clhubp5rk0008bug8wplt64s1",
    //         "sewaService_id": "clhubp5rk0008bug8wplt62s2",
    //         "title": "kharidar",
    //         "user_id": "clhubp5rk0008bug8wplt62s1",
    //         "description": null,
    //         "image": null,
    //         "status": "PUBLISHED",
    //         "package_title": null,
    //         "created_at": "2023-05-24T11:07:47.801Z",
    //         "updated_at": "2023-05-24T11:07:47.801Z"
    //     },
    //     {
    //         "id": "clhubp5rk0008bug8wplt64s2",
    //         "sewaService_id": "clhubp5rk0008bug8wplt62s2",
    //         "title": "nayabsubba",
    //         "user_id": "clhubp5rk0008bug8wplt62s1",
    //         "description": null,
    //         "image": null,
    //         "status": "PUBLISHED",
    //         "package_title": null,
    //         "created_at": "2023-05-24T11:07:47.807Z",
    //         "updated_at": "2023-05-24T11:07:47.807Z"
    //     },
    //     {
    //         "id": "clhubp5rk0008bug8wplt64s3",
    //         "sewaService_id": "clhubp5rk0008bug8wplt62s2",
    //         "title": "adhikrit",
    //         "user_id": "clhubp5rk0008bug8wplt62s1",
    //         "description": null,
    //         "image": null,
    //         "status": "PUBLISHED",
    //         "package_title": null,
    //         "created_at": "2023-05-24T11:07:47.809Z",
    //         "updated_at": "2023-05-24T11:07:47.809Z"
    //     }
    // ]

    // Object of SubService's ID
    const sub_services_ids = {};
    subServices.forEach((item) => {
      sub_services_ids[`${item.title}`] = `${item.id}`;
    });

    // sub_services_ids;
    // {
    //   "kharidar": "clhubp5rk0008bug8wplt64s1",
    //   "nayabsubba": "clhubp5rk0008bug8wplt64s2",
    //   "adhikrit": "clhubp5rk0008bug8wplt64s3"
    // }

    // Get ExamSets ID of SubService's ID
    var examSetIDs: Record<string, Array<object>> = {};

    for (const [key, value] of Object.entries(sub_services_ids)) {
      const examSet_Ids = await this.prisma.examSet.findMany({
        where: { subService_id: String(value) },
      });

      const only_id_title = examSet_Ids.map((item) => {
        return {
          id: item.id,
          title: item.title,
        };
      });

      examSetIDs[`${key}`] = only_id_title;
    }

    // examSetIDs;
    //   {
    //     "kharidar": [
    //         {
    //             "id": "clhubp5rk0008bug8wplt65s1",
    //             "title": "MOCK EXAM SET 1"
    //         }
    //     ],
    //     "nayabsubba": [],
    //     "adhikrit": []
    // }

    // Return Exam Progress of ExamSets Of SubServices using userId & examSetId
    var exam_progress = {};

    for (let [key, value] of Object.entries(examSetIDs)) {
      value.forEach(async (item: object) => {
        const eProgres = await this.prisma.exam_Progress.findMany({
          where: {
            userId: id,
            examSet_Id: item['id'],
          },
        });

        // console.log(id);
        // console.log(item['id']);
        // console.log(eProgres);
        exam_progress[`${key}`] = eProgres;

        console.log(exam_progress);
      });
    }
    return exam_progress;
  }

  exam() {
    return this.prisma.exam_Progress.findMany();
  }
}
