import { LEVEL, PrismaClient, Result, Role, STATUS } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // USER
  await prisma.user.upsert({
    where: { id: 'clhua4n4t0000but8wsapabsd' },
    update: {},
    create: {
      id: 'clhua4n4t0000but8wsapabsd',
      username: 'admin',
      email: 'admin@admin.com',
      first_name: 'admin',
      middle_name: 'admin',
      last_name: 'admin',
      password: await hash('admin'),
      role: Role.ADMIN,
    },
  });
  await prisma.user.upsert({
    where: { id: 'clhubp5rk0008bug8wplt62s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt62s1',
      username: 'test',
      email: 'test@test.com',
      first_name: 'test',
      middle_name: 'test',
      last_name: 'test',
      password: await hash('test'),
      role: Role.USER,
    },
  });
  await prisma.user.upsert({
    where: { id: 'clhubp5rk0008bug8wplt1000s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt1000s1',
      username: 'subscribe',
      email: 'subscribe@subscribe.com',
      first_name: 'subscribe',
      middle_name: 'subscribe',
      last_name: 'subscribe',
      password: await hash('subscribe'),
      role: Role.SUBSCRIBED_USER,
    },
  });
  await prisma.user.upsert({
    where: { id: 'clhubp5rk0008bug8wplt1018970s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt1018970s1',
      username: 'moderator',
      email: 'moderator@moderator.com',
      first_name: 'moderator',
      middle_name: 'moderator',
      last_name: 'moderator',
      password: await hash('moderator'),
      role: Role.MODERATOR,
    },
  });

  // SEWA SERVICE
  await prisma.sewaService.upsert({
    where: { id: 'clhubp5rk0008bug8wplt62s2' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt62s2',
      title: 'nijamati',
      status: STATUS.PUBLISHED,
    },
  });
  await prisma.sewaService.upsert({
    where: { id: 'clhubp5rk0008bug8wplt100s2' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt100s2',
      title: 'nepalpolice',
      status: STATUS.PUBLISHED,
    },
  });
  await prisma.sewaService.upsert({
    where: { id: 'clhubp5rk0008bug8wplt101s2' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt101s2',
      title: 'nepalarmy',
      status: STATUS.PUBLISHED,
    },
  });

  // SUB SERVICE
  await prisma.subService.upsert({
    where: { id: 'clhubp5rk0008bug8wplt64s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt64s1',
      sewaService_id: 'clhubp5rk0008bug8wplt62s2',
      title: 'kharidar',
      user_id: 'clhubp5rk0008bug8wplt1000s1',
      status: STATUS.PUBLISHED,
    },
  });
  await prisma.subService.upsert({
    where: { id: 'clhubp5rk0008bug8wplt64s2' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt64s2',
      sewaService_id: 'clhubp5rk0008bug8wplt62s2',
      title: 'nayabsubba',
      user_id: 'clhubp5rk0008bug8wplt1000s1',
      status: STATUS.PUBLISHED,
    },
  });
  await prisma.subService.upsert({
    where: { id: 'clhubp5rk0008bug8wplt64s3' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt64s3',
      sewaService_id: 'clhubp5rk0008bug8wplt62s2',
      title: 'adhikrit',
      user_id: 'clhubp5rk0008bug8wplt1000s1',
      status: STATUS.PUBLISHED,
    },
  });

  // EXAM SET
  await prisma.examSet.upsert({
    where: { id: 'clhubp5rk0008bug8wplt65s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt65s1',
      subService_id: 'clhubp5rk0008bug8wplt64s1',
      title: 'MOCK EXAM SET 1',
      level: LEVEL.EASY,
      negative_mark_value: 0.25,
    },
  });
  await prisma.examSet.upsert({
    where: { id: 'clhubp5rk0008bug8wplt65456s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt65456s1',
      subService_id: 'clhubp5rk0008bug8wplt64s1',
      title: 'MOCK EXAM SET 2',
      level: LEVEL.EASY,
      negative_mark_value: 0.25,
    },
  });

  // EXAM CATEGORY
  await prisma.examCategory.upsert({
    where: { id: 'clhubp5rk0008bug8wplt66s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt66s1',
      examSet_id: 'clhubp5rk0008bug8wplt65s1',
      title: 'General Knowledge',
    },
  });
  await prisma.examCategory.upsert({
    where: { id: 'clhubp5rk0008bug8wplt67s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt67s1',
      examSet_id: 'clhubp5rk0008bug8wplt65s1',
      title: 'Public Management',
    },
  });

  // EXAM QUESTIONS
  // GK
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt68s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt68s1',
      examCategory_id: 'clhubp5rk0008bug8wplt66s1',
      syllabusStr: 'General Knowledge',
      syllabusSubStr: faker.random.word(),
      question:
        'Who is known as the "Iron Man" of Nepal for his contributions to the establishment of the Lok Sewa Aayog (Public Service Commission)?',
      options: [
        'Ganesh Man Singh',
        'Bhim Dutt Pant',
        'BP Koirala',
        'Ganesh Prasad Upadhyay',
      ],
      correct_ans: 'Ganesh Prasad Upadhyaya',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt69s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt69s1',
      examCategory_id: 'clhubp5rk0008bug8wplt66s1',
      syllabusStr: 'General Knowledge',
      syllabusSubStr: faker.random.word(),
      question:
        'In which year was the Public Service Commision established in Nepal?',
      options: ['1947', '1951', '1959', '1960'],
      correct_ans: '1960',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt70s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt70s1',
      examCategory_id: 'clhubp5rk0008bug8wplt66s1',
      syllabusStr: 'General Knowledge',
      syllabusSubStr: faker.random.word(),
      question:
        'Which one of the following is the highest rank in Civil Service of Nepal?',
      options: [
        'Section Officer',
        'Under Secretary',
        'Joint Secretary',
        'Secretary',
      ],
      correct_ans: 'Secretary',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt71s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt71s1',
      examCategory_id: 'clhubp5rk0008bug8wplt66s1',
      syllabusStr: 'General Knowledge',
      syllabusSubStr: faker.random.word(),
      question:
        'Which one of the following is not one of the constitutional bodies in Nepal related to Lok Sewa?',
      options: [
        'Public Service Commission',
        'National Human Rights Commission',
        'Election Commission',
        'Audit Commission',
      ],
      correct_ans: 'Audit Commission',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt72s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt72s1',
      examCategory_id: 'clhubp5rk0008bug8wplt66s1',
      syllabusStr: 'General Knowledge',
      syllabusSubStr: faker.random.word(),
      question:
        'Which article of the Constitution of Nepal governs the provisions of Lok Sewa Aayog?',
      options: ['Article 55', 'Article 87', 'Article 115', 'Article 138'],
      correct_ans: 'Article 115',
      explaination: faker.random.word(),
    },
  });

  // Public Management
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt73s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt73s1',
      examCategory_id: 'clhubp5rk0008bug8wplt67s1',
      syllabusStr: 'Public Management',
      syllabusSubStr: faker.random.word(),
      question:
        'Which of the following is NOT one of the functions of public management?',
      options: [
        'Planning & Organizing',
        'Controlling & Co-ordinating',
        'Leading & Directing',
        'Marketing & Sales',
      ],
      correct_ans: 'Marketing & Sales',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt74s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt74s1',
      examCategory_id: 'clhubp5rk0008bug8wplt67s1',
      syllabusStr: 'Public Management',
      syllabusSubStr: faker.random.word(),
      question:
        'Which is the primary objective of performance management in public administration?',
      options: [
        'Enhancing Employee Satisfaction',
        'Maximizing Budget Allocation',
        'Improving Service Delivery',
        'Increasing Political Influence',
      ],
      correct_ans: 'Improving Service Delivery',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt75s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt75s1',
      examCategory_id: 'clhubp5rk0008bug8wplt67s1',
      syllabusStr: 'Public Management',
      syllabusSubStr: faker.random.word(),
      question: 'Which does SWOT analysis stand for in public management?',
      options: [
        'Strengths, Weaknesses, Opportunities, Threats',
        'Service, Workforce, Operations, Tactics',
        'Structure, Workflow, Objectives, Tasks',
        'Strategy, Workload, Organization, Tools',
      ],
      correct_ans: 'Strengths, Weaknesses, Opportunities, Threats',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt76s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt76s1',
      examCategory_id: 'clhubp5rk0008bug8wplt67s1',
      syllabusStr: 'Public Management',
      syllabusSubStr: faker.random.word(),
      question:
        'Which of the following is a key principle of effective public procurement?',
      options: [
        'Transparency & Fairness',
        'Personal Favoritism',
        'Bypassing Bidding Procedures',
        'Collusion With Suppliers',
      ],
      correct_ans: 'Transparency & Fairness',
      explaination: faker.random.word(),
    },
  });
  await prisma.examQuestion.upsert({
    where: { id: 'clhubp5rk0008bug8wplt77s1' },
    update: {},
    create: {
      id: 'clhubp5rk0008bug8wplt77s1',
      examCategory_id: 'clhubp5rk0008bug8wplt67s1',
      syllabusStr: 'Public Management',
      syllabusSubStr: faker.random.word(),
      question:
        'What is the purpose of a stakeholder analysis in public management?',
      options: [
        'Identifying Potential Conflicts of Interest',
        'Allocating Project Funds',
        'Determining Staffing Requirements',
        'Streamlining Bureaucratic Processes',
      ],
      correct_ans: 'Identifying Potential Conflicts of Interest',
      explaination: faker.random.word(),
    },
  });
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
