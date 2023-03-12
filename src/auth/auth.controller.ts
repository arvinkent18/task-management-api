import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Token } from './token.interface';
import { Public } from '../common/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs in a user and returns a JWT token.
   *
   * @param {LoginDto} loginDto - The DTO containing the user's login credentials.
   * @throws {UnauthorizedException} If invalid user credentials
   * @returns {Promise<Token>} A JWT token.
   */
  @ApiResponse({ status: HttpStatus.OK })
  @ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED })
  @ApiBody({
    type: LoginDto,
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    return this.authService.login(loginDto);
  }

  /**
   * Register an account for a user.
   *
   * @param {RegisterDto} registerDto - The data required for registering the user.
   * @throws {UnprocessableEntityException} If the user already exists.
   * @throws {InternalServerErrorException} If there is an internal server error.
   * @returns {Promise<User>} The newly registered user.
   */
  @ApiBody({
    type: RegisterDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    try {
      const registerUser = this.authService.register(registerDto);

      return registerUser;
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
