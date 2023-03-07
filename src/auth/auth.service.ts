import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Token } from './token.interface';
import { User } from '../users/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  // async validateUser(username: string, password: string): Promise<User> {
  //   const user = await this.usersService.findOne(username);

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const { password, ...result } = user;
      
  //     return result;
  //   }
  //   return null;
  // }

  // async login(loginDto: LoginDto): Promise<Token> {
  //   const user = await this.validateUser(
  //     loginDto.username,
  //     loginDto.password,
  //   );
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { username: user.username, sub: user._id };
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //   };
  // }

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username };
    return this.jwtService.signAsync(payload);
  }
}
