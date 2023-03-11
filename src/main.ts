import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule} from '@nestjs/swagger';
import { swaggerConfig, swaggerCustomOptions } from './config/swagger.config';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap(): Promise<void> {
  try {
    const app: INestApplication = await NestFactory.create(AppModule);

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
    await app.listen(3000);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
