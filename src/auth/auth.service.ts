import { RegisterDto } from './dto/register.dto';
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

  /**
   * Validates a user's credentials and returns the user object if successful.
   * Throws an UnauthorizedException if the user doesn't exist or if the
   * password is incorrect.
   * @param {string} username - The username of the user to validate.
   * @param {string} password - The password of the user to validate.
   * @returns {Promise<User>} The validated user object.
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser({ username });
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  /**
   * Logs in a user and returns a JWT token.
   *
   * @param {LoginDto} loginDto - The DTO containing the user's login credentials.
   * @returns {Promise<Token>} A JWT token.
   */
  async login(loginDto: LoginDto): Promise<Token> {
    const { username, password } = loginDto;
    const user: User = await this.validateUser(username, password);
    const payload: Payload = {
      id: user.id,
      username: user.username,
    };

    return {
      accessToken: await this.generateToken(payload),
    };
  }

  /**
   * Creates a new user account.
   *
   * @param {RegisterDto} registerDto - The DTO containing the user's registration data.
   * @returns {Promise<User>} The newly created user object.
   */
  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.usersService.createUser(registerDto);

    return user;
  }

  /**
   * Generates a JWT token for the given payload.
   * @param {Payload} payload - The payload to use for generating the token.
   * @returns {Promise<string>} A JWT token.
   */
  async generateToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
