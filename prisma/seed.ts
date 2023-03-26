import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i <= 100; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        type: Role[faker.datatype.number({ min: 0, max: 1 })],
        progress: {
          create: {
            score: faker.datatype.number({ min: 0, max: 1000 }),
            negative_score: faker.datatype.number({ min: 0, max: 1000 }),
            quiz: {
              create: {
                name: faker.lorem.word(),
                cost: faker.datatype.number({ min: 0, max: 1000 }),
                negative_mark_value: faker.datatype.float({ min: 0, max: 1 }),
                category: {
                  create: {
                    name: faker.lorem.word(),
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  const users = (await prisma.user.findMany()).map((user) => user.email);
  const quizzes = await prisma.quiz.findMany();

  for (let i = 0; i < 100; i++) {
    await prisma.transaction.create({
      data: {
        amount: faker.datatype.number({ min: 0, max: 1000 }),
        transaction_date: faker.date.past(),
        quiz: {
          connect: {
            id: quizzes[faker.datatype.number({ min: 0, max: quizzes.length })]
              .id,
          },
        },
        user: {
          connect: {
            email: users[faker.datatype.number({ min: 0, max: users.length })],
          },
        },
      },
    });
  }
  for (let i = 0; i <= 100; i++) {
    await prisma.question.create({
      data: {
        text: faker.lorem.sentence(),
        answer_explanation: faker.lorem.paragraph(),
        correct_answer: faker.lorem.word(),
        options: [
          faker.lorem.word(),
          faker.lorem.word(),
          faker.lorem.word(),
          faker.lorem.word(),
        ],
        quiz: {
          connect: {
            id: quizzes[faker.datatype.number({ min: 0, max: quizzes.length })]
              .id,
          },
        },
      },
    });
  }
}

main()
  .catch(async (e) => {
    console.error('Got an error: ', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
