import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 15,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
