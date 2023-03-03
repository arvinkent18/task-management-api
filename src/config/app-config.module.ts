import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidations } from '../env.validation';

const { validationSchema } = envValidations;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema,
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
