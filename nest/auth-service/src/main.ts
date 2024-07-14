import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { config } from '@repo/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    config.nestMicroserviceOptions,
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
