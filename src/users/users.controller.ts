import { QueryResponse } from './../common/interfaces/query-response.interface';
import {
  Body,
  Controller,
  Post,
  Query,
  HttpStatus,
  UseInterceptors,
  UnprocessableEntityException,
  InternalServerErrorException,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TransformResponseInterceptor } from '../common/interceptors/transform-response.interceptor';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user based on the given user data.
   *
   * @param {CreateUserDto} createUserDto - The data for the user to create.
   * @throws {UnprocessableEntityException} If the user already exists.
   * @throws {InternalServerErrorException} If there is an internal server error.
   * @returns {Promise<User>} The newly created user.
   */
  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  @UseInterceptors(TransformResponseInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersService.createUser(createUserDto);

      return user;
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Find a user by username.
   * 
   * @param {GetUserDto} getUserDto - The data for the user to search.
   * @returns {Promise<User>} The user data.
   */
  @Get('username')
  @UseInterceptors(TransformResponseInterceptor)
  async findUser(@Query() getUserDto: GetUserDto): Promise<User> {
    try {
      const user = this.usersService.findUser(getUserDto);

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
