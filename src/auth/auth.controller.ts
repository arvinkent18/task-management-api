import { User } from '../users/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserAuthService } from '../shared/user-auth/user-auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userAuthService: UserAuthService,
  ) {}
  
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('register')
  async register(@Body() createUserdto: CreateUserDto): Promise<User> {
    return this.userAuthService.register(createUserdto);
  }
}
