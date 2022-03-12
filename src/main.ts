import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { ValidationPipe } from '@nestjs/common';
import { LanguageValidation } from './common/interceptors/accept-language.intercepter';
import { LangaugeSetter } from './common/interceptors/language-setter.intercepter';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const firebaseCert = './akemha-e7abd-firebase-adminsdk-lfw2q-b4f1dec0cf.json';
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCert)
  })

  //swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Akemha Docs')
    .setDescription('Akemha API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LanguageValidation);
  app.useGlobalInterceptors(new LangaugeSetter);
  await app.listen(process.env.PORT || 80);
}
bootstrap();
