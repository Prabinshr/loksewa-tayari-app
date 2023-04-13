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
    QuestionModule,
    UserProgressModule,
    TransactionModule,
    QuestionCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
