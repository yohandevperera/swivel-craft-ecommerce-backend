import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { systemLogger } from './utls/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: systemLogger,
  });
  await app.listen(5000);
}
bootstrap();
