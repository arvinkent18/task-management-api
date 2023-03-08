import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Token } from './token.interface';
import { User } from '../users/user.interface';
import { Payload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.checkIfUserExists(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  }

  async login(loginDto: LoginDto): Promise<Token> {
    const { username, password } = loginDto;

    const user: User = await this.validateUser(username, password);

    const payload: Payload = {
      _id: user._id,
      username: user.username,
    };

    return {
      accessToken: await this.generateToken(payload),
    };
  }

  async generateToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
