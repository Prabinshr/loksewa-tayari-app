import { PrismaClient, Role, STATUS } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i <= 5; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        middle_name: faker.name.middleName(),
        last_name: faker.name.lastName(),
        password: await hash('admin'),
        role: Role[faker.datatype.number({ min: 0, max: 2 })],
        transactions: {
          create: {
            amount: faker.datatype.number({ min: 0, max: 10000 }),
            transaction_date: faker.date.past(),
            quiz: {
              create: {
                name: faker.lorem.word(),
                cost: faker.datatype.number({ min: 0, max: 1000 }),
                category: {
                  create: {
                    name: faker.lorem.word(),
                  },
                },
              },
            },
          },
        },
        progress: {
          create: {
            score: faker.datatype.number({ min: 0, max: 1000 }),
            negative_score: faker.datatype.number({ min: 0, max: 1000 }),
            quiz: {
              create: {
                name: faker.lorem.word(),
                cost: faker.datatype.number({ min: 0, max: 1000 }),
                negative_mark_value: faker.datatype.float({ min: 0, max: 1 }),
                Question: {
                  create: {
                    text: 'What is the capital of the Philippines?',
                    correct_answer: 'Manila',
                    options: ['Manila', 'Cebu', 'Davao', 'Baguio'],
                    answer_explanation:
                      'Manila is the capital of the Philippines',
                    Question_Category: {
                      create: {
                        name: 'Geography',
                      },
                    },
                  },
                },
                category: {
                  create: {
                    name: "Nirdesh's Quiz",
                  },
                },
              },
            },
          },
        },
      },
    });
    await prisma.sewaService.create({
      data: {
        description: faker.lorem.word(),
        image: faker.image.animals(),
        // status: STATUS[faker.datatype.number({ min: 0, max: 1 })],
        status: 'PUBLISHED' || 'UNPUBLISHED',
      },
    });
   
      await prisma.syllabusStructure.create({
        data: {
          title: faker.lorem.word(),
          description: faker.lorem.words(),
          image: faker.image.business(),
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
