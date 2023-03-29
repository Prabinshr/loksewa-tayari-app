import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Quiz Platform API')
    .setDescription(
      'This API allows users to access and interact with quizzes on the Quiz Platform. Administrators can manage quizzes and questions, while regular users can take quizzes and view their progress and scores.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'Authorization',
        bearerFormat: "JWT",
        description: "Enter your JWT token",
        in: 'header',
      },
      'jwt',
    )
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform:true }));
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
