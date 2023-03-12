import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { QuizCategoryModule } from 'src/quiz_category/quiz_category.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuestionModule } from 'src/question/question.module';
import { UserProgressModule } from 'src/progress/progress.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { QuestionCategoryModule } from 'src/question_category/question_category.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    QuizCategoryModule,
    QuizModule,
    QuestionModule,
    UserProgressModule,
    TransactionModule,
    QuestionCategoryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
