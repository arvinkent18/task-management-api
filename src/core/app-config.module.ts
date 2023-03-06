import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { envValidations } from '../env.validation';

const { validationSchema }: ConfigModuleOptions = envValidations;

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
