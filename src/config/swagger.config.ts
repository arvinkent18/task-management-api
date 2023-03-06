import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Tasks API')
  .setDescription('API for managing tasks')
  .setVersion('1.0')
  .build();
