import { UserAuthService } from './user-auth.service';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    UsersModule,
  ],
  providers: [
    UserAuthService,
  ],
  exports: [
    UserAuthService,
  ],
})
export class UserAuthModule {}
