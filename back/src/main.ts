import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: ['http://localhost:3000'] });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
