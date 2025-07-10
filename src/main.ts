import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://mytodolist-hari1.s3-website.ap-south-1.amazonaws.com/', // 👈 your frontend domain
    methods: 'GET,POST,PUT,DELETE',
  });
  await app.listen(3000);
}
bootstrap();
