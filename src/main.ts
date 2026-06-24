/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('ShoppingCart API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
      },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away properties not explicitly defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if unknown properties are passed
      transform: true, // Automatically converts network strings to specified DTO types
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
