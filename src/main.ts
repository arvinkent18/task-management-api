import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerCustomOptions } from './config/swagger.config';
import helmet from 'helmet';
import compression = require('compression');
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  try {
    const app: INestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.use(compression());
    app.enableCors();
    app.use(helmet());
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    SwaggerModule.setup(
      'api-docs',
      app,
      SwaggerModule.createDocument(app, swaggerConfig),
      swaggerCustomOptions,
    );
    await app.listen(configService.get<number>('PORT'));
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
