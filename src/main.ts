import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './tasks/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*', // 👈 your frontend domain
    methods: 'GET,POST,PATCH,PUT,DELETE',
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
