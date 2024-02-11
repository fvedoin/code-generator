import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const originFallback = '*';
  app.enableCors({ origin: process.env.CORS_ORIGIN ?? originFallback });
  await app.listen(3000);
}
bootstrap();
