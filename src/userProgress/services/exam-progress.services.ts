import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamProgressDto } from '../dto';

@Injectable()
export class UserExamProgressService {
  constructor(private prisma: PrismaService) {}

  async create(createExamProgressDto: CreateExamProgressDto) {
    return await this.prisma.exam_Progress.create({
      data: createExamProgressDto,
    });
  }

  // EXAM PROGRESS
  // To Find User's Exam Progress In Specific Exam Set
  // we need the userId & examSetId
  async findAll(id: string) {
    // BELOW TO GET THE EXAM SET ID THE USER HAS GIVEN EXAM

    // Finding All The SubServices The User Has Enrolled
    const { subServices } = await this.prisma.user.findUnique({
      where: { id },
      include: { subServices: true },
    });
    // Sample Output of subServices
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

    // Getting Object of SubService's ID
    const sub_services_ids = {};

    subServices.forEach((item) => {
      sub_services_ids[`${item.title}`] = `${item.id}`;
    });
    // Sample Output of sub_services_ids;
    // {
    //   "kharidar": "clhubp5rk0008bug8wplt64s1",
    //   "nayabsubba": "clhubp5rk0008bug8wplt64s2",
    //   "adhikrit": "clhubp5rk0008bug8wplt64s3"
    // }

    // Get All ExamSets of SubService
    var examSetIDs: Record<string, Object[]> = {};

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
    // Sample Output of examSetIDs;
    //   {
    //     "kharidar": [
    //         {
    //             "id": "clhubp5rk0008bug8wplt65s1",
    //             "title": "MOCK EXAM SET 1"
    //         }
    //         {
    //             "id": "clhubp5rk0008bug8wplt107s1",
    //             "title": "MOCK EXAM SET 2"
    //         }
    //     ],
    //     "nayabsubba": [],
    //     "adhikrit": []
    // }

    // Return Exam Progress of ExamSets The User Has Attempted
    // Using userId & examSetId
    var exam_progress = {};
    for (let [key, value] of Object.entries(examSetIDs)) {
      const arr = value.map(async (item: object) => {
        const progress = await this.prisma.exam_Progress.findFirst({
          where: {
            userId: id,
            examSet_Id: item['id'],
          },
        });
        const { title } = await this.prisma.examSet.findUnique({
          where: {
            id: item['id'],
          },
        });
        const examProgress = { title: `${title}`, ...progress };

        return examProgress;
        // return examProgress;
        // console.log(id);
        // console.log(item['id']);
        // console.log(eProgres);
        // console.log(examProgress);

        // progress.push(examProgress);
        // console.log(progress);
      });

      exam_progress[`${key}`] = await Promise.all(arr);
    }
    return exam_progress;
  }

  async findOne(id: string, subService: string) {
    // Finding All The SubServices The User Has Enrolled
    const { subServices } = await this.prisma.user.findUnique({
      where: { id },
      include: { subServices: true },
    });
    // Getting The SubService's ID
    var subService_id: string;
    subServices.forEach((item) => {
      if (item.title === subService.toLowerCase()) {
        subService_id = item.id;
      }
    });
    if (!subService_id)
      throw new HttpException(
        `User Has Not Enrolled In The ${subService}`,
        404,
      );
    // Gettng All The Exam Sets Of SubService
    const examSets = await this.prisma.examSet.findMany({
      where: {
        subService_id,
      },
    });
    // Getting The Exam Progress of Specific SubService's
    // Exam Sets The User Attempted
    const examProgress = examSets.map(async (item) => {
      const progress = await this.prisma.exam_Progress.findFirst({
        where: {
          userId: id,
          examSet_Id: item.id,
        },
      });
      const { title } = await this.prisma.examSet.findUnique({
        where: {
          id: item.id,
        },
      });
      const examProgress = { title: `${title}`, ...progress };
      return examProgress;
    });
    const progress = await Promise.all(examProgress);
    return progress;
  }

  update() {}

  remove() {}

  // exam() {
  //   return this.prisma.exam_Progress.findMany();
  // }
}
