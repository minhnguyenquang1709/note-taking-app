import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // init app
  const app = await NestFactory.create(AppModule);

  // CORS
  const corsOptions = {};
  app.enableCors(corsOptions);

  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // pipe

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.APP_NAME ?? 'Note Taking API')
    .setDescription('The Note Taking API documentation')
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'Enter token in the format: Bearer <token>',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
    })
    .build();
  const userApiDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [],
  });
  // hide paths
  // Object.keys(userApiDocument.paths).

  // setup swagger
  SwaggerModule.setup('api', app, userApiDocument, {
    swaggerOptions: {
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
    },
  });

  // start app
  await app.listen(process.env.APP_PORT ?? 3000);
  console.log(`Server started from port ${process.env.APP_PORT}`);
}

// initialize & start app
bootstrap();
