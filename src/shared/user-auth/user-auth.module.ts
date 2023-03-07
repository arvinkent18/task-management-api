import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../users/users.service';
import { AuthService } from './../../auth/auth.service';
import { UserAuthService } from './user-auth.service';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    UserAuthService,
    AuthService,
    UsersService,
    JwtService,
  ],
  exports: [
    UserAuthService,
  ],
})
export class UserAuthModule {}
