import { UsersService } from './../users/users.service';
import { User } from '../users/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Token } from './token.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    return this.authService.login(loginDto);
  }
}
