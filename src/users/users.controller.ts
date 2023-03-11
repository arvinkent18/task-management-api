import {
  Body,
  Controller,
  Post,
  Query,
  HttpStatus,
  UseInterceptors,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
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
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // @ApiQuery({
  //   type: CreateUserDto,
  // })
  // @Post()
  // async findUser(@Query('username') getUserDto: GetUserDto): Promise<User> {
  //   return this.usersService.findUser(getUserDto);
  // }
}
