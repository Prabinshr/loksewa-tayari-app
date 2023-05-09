import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  AsyncApiDocumentBuilder,
  AsyncApiModule,
  AsyncServerObject,
} from 'nestjs-asyncapi';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { BASE_URL } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'jwt',
    )
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  if (process.env.NODE_ENV === 'development') {
    // Socket.io docs integration
    const asyncApiServer: AsyncServerObject = {
      url: BASE_URL.backend,
      protocol: 'socket.io',
      protocolVersion: '4',
      description:
        'Allows you to connect using the websocket protocol to our Socket.io server.',
      security: [{ 'user-password': [] }],
      variables: {
        port: {
          description: 'Secure connection (TLS) is available through port 443.',
          default: '443',
        },
      },
      bindings: {},
    };

    const asyncApiOptions = new AsyncApiDocumentBuilder()
      .setTitle('Loksewa APP Server')
      .setDescription('The Loksewa App SocketIO documentation')
      .setVersion('1.0')
      .setDefaultContentType('application/json')
      .addSecurity('user-password', { type: 'userPassword' })
      .addServer('loksewa', asyncApiServer)
      .build();

    const asyncapiDocument = AsyncApiModule.createDocument(
      app,
      asyncApiOptions,
    );
    await AsyncApiModule.setup('/docs/socket', app, asyncapiDocument);
  }
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
