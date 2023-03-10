import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { AppConfigModule } from './core/app-config.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { THROTTLE_TTL, THROTTLE_LIMIT } from './constants';

@Module({
  imports: [
    AppConfigModule,
    ThrottlerModule.forRoot({
      ttl: THROTTLE_TTL,
      limit: THROTTLE_LIMIT,
    }),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
