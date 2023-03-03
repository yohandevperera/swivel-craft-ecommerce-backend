import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { systemLogger } from './utls/logger';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: systemLogger,
  });
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Employee Manager API')
    .setDescription('All APIs needed for the employee manager server')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.SERVER_PORT || 5000);
}
bootstrap();
