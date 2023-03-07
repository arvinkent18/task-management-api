import { UsersService } from '../users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_USER_MODEL } from '../constants';
import { UserSchema } from 'users/user.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    MongooseModule.forFeature([{ name: DB_USER_MODEL, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
    UsersService,
  ],
  exports: [
    AuthService, 
    JwtModule, 
    PassportModule,
  ],
})
export class AuthModule {}
