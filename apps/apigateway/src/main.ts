import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function setupSwagger (app: INestApplication) {
  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('The API documentation for your project')
  .setVersion('1.0')
  .addBearerAuth() // Add JWT token support, optional
  .build();

// Create the Swagger document
const document = SwaggerModule.createDocument(app, config);

// Set up the Swagger module on a specific route
SwaggerModule.setup('api-docs', app, document);
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set up Swagger options
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
