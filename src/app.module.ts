import { AppConfigModule } from './core/app-config.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/auth.guard';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    TasksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
