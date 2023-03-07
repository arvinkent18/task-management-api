import { AppConfigModule } from './core/app-config.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserAuthModule } from './shared/user-auth/user-auth.module';

@Module({
  imports: [
    AppConfigModule, 
    DatabaseModule, 
    AuthModule, 
    TasksModule, 
    UsersModule, 
    UserAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
