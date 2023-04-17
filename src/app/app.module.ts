import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuestionModule } from 'src/question/question.module';
import { UserProgressModule } from 'src/userProgress/progress.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { QuestionCategoryModule } from 'src/questionCategory/question_category.module';
import { AuthModule } from 'src/auth/auth.module';
import { QuizCategoryModule } from 'src/quizCategory/quiz_category.module';
import { UserService } from 'src/user/user.service';
import { OtpModule } from 'src/otp/otp.module';
import { SocketModule } from 'src/socket/socket.module';
import { SewaserviceModule } from 'src/sewaservice/sewaservice.module';
import { SubServiceModule } from 'src/sub-service/sub-service.module';
import { SyllabusStructureModule } from 'src/syllabus-structure/syllabus-structure.module';
import { SyllabusSubStructure } from 'src/syllabus-sub-structure/entities/syllabus-sub-structure.entity';
import { SyllabusSubStructureModule } from 'src/syllabus-sub-structure/syllabus-sub-structure.module';
import { SubStrTopicModule } from 'src/sub-str-topic/sub-str-topic.module';
import { SubserviceHasSyllabusModule } from 'src/subservice-has-syllabus/subservice-has-syllabus.module';
import { QuestionSetModule } from 'src/question-set/question-set.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    OtpModule,
    SocketModule,
    QuizCategoryModule,
    QuizModule,
    SewaserviceModule,
    SubServiceModule,
    SyllabusStructureModule,
    SyllabusSubStructureModule,
    SubStrTopicModule,
    SubserviceHasSyllabusModule,
    QuestionSetModule,
    QuestionModule,
    UserProgressModule,
    TransactionModule,
    QuestionCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
