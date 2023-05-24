import { LEVEL, PrismaClient, Role, STATUS } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // USER
  await prisma.user.create({
    data: {
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
  await prisma.user.create({
    data: {
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

  // SEWA SERVICE
  await prisma.sewaService.create({
    data: {
      id: 'clhubp5rk0008bug8wplt62s2',
      title: 'NIJAMATI',
      status: STATUS.PUBLISHED,
    },
  });

  // SUB SERVICE
  await prisma.subService.create({
    data: {
      id: 'clhubp5rk0008bug8wplt64s1',
      sewaService_id: 'clhubp5rk0008bug8wplt62s2',
      title: 'KHARIDAR',
      user_id: 'clhubp5rk0008bug8wplt62s1',
      status: STATUS.PUBLISHED,
    },
  });
  await prisma.subService.create({
    data: {
      id: 'clhubp5rk0008bug8wplt64s2',
      sewaService_id: 'clhubp5rk0008bug8wplt62s2',
      title: 'NAYABSUBBA',
      user_id: 'clhubp5rk0008bug8wplt62s1',
      status: STATUS.PUBLISHED,
    },
  });
  await prisma.subService.create({
    data: {
      id: 'clhubp5rk0008bug8wplt64s3',
      sewaService_id: 'clhubp5rk0008bug8wplt62s2',
      title: 'ADHIKRIT',
      user_id: 'clhubp5rk0008bug8wplt62s1',
      status: STATUS.PUBLISHED,
    },
  });

  // EXAM SET
  await prisma.examSet.create({
    data: {
      id: 'clhubp5rk0008bug8wplt65s1',
      subService_id: 'clhubp5rk0008bug8wplt64s1',
      title: 'MOCK EXAM SET 1',
      level: LEVEL.EASY,
      negative_mark_value: 0.25,
    },
  });

  // EXAM CATEGORY
  await prisma.examCategory.create({
    data: {
      id: 'clhubp5rk0008bug8wplt66s1',
      examSet_id: 'clhubp5rk0008bug8wplt65s1',
      title: 'General Knowledge',
    },
  });
  await prisma.examCategory.create({
    data: {
      id: 'clhubp5rk0008bug8wplt67s1',
      examSet_id: 'clhubp5rk0008bug8wplt65s1',
      title: 'Public Management',
    },
  });

  // EXAM QUESTIONS
  // GK E.Q.
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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
  await prisma.examQuestion.create({
    data: {
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

  // FORUM
  await prisma.forum.create({
    data: {
      id: 'clhubp5rk0008bug8wplt78s1',
      title: 'KHARIDAR',
    },
  });
  await prisma.forum.create({
    data: {
      id: 'clhubp5rk0008bug8wplt79s1',
      title: 'NAYABSUBBA',
    },
  });
  await prisma.forum.create({
    data: {
      id: 'clhubp5rk0008bug8wplt80s1',
      title: 'ADHIKRIT',
    },
  });

  // POST
  await prisma.post.create({
    data: {
      id: 'clhubp5rk0008bug8wplt81s1',
      forumId: 'clhubp5rk0008bug8wplt78s1',
      userId: 'clhubp5rk0008bug8wplt62s1',
      content: 'What is the scientific name of human beings?',
    },
  });
  await prisma.post.create({
    data: {
      id: 'clhubp5rk0008bug8wplt82s1',
      forumId: 'clhubp5rk0008bug8wplt79s1',
      userId: 'clhubp5rk0008bug8wplt62s1',
      content: 'What is the scientific name of human beings?',
    },
  });
  await prisma.post.create({
    data: {
      id: 'clhubp5rk0008bug8wplt83s1',
      forumId: 'clhubp5rk0008bug8wplt80s1',
      userId: 'clhubp5rk0008bug8wplt62s1',
      content: 'What is the scientific name of human beings?',
    },
  });

  // COMMENT
  await prisma.comments.create({
    data: {
      id: 'clhubp5rk0008bug8wplt84s1',
      postId: 'clhubp5rk0008bug8wplt81s1',
      userId: 'clhubp5rk0008bug8wplt62s1',
      content: "It's Homo Sapiens.",
    },
  });
  await prisma.comments.create({
    data: {
      id: 'clhubp5rk0008bug8wplt85s1',
      postId: 'clhubp5rk0008bug8wplt82s1',
      userId: 'clhubp5rk0008bug8wplt62s1',
      content: "It's Homo Sapiens.",
    },
  });
  await prisma.comments.create({
    data: {
      id: 'clhubp5rk0008bug8wplt86s1',
      postId: 'clhubp5rk0008bug8wplt83s1',
      userId: 'clhubp5rk0008bug8wplt62s1',
      content: "It's Homo Sapiens.",
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
