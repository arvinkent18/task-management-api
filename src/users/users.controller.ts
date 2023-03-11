import {
  Body,
  Controller,
  Post,
  Query,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TransformResponseInterceptor } from '../common/interceptors/transform-response.interceptor';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  @UseInterceptors(TransformResponseInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.createUser(createUserDto);

    return user;
  }

  // @ApiQuery({
  //   type: CreateUserDto,
  // })
  // @Post()
  // async findUser(@Query('username') getUserDto: GetUserDto): Promise<User> {
  //   return this.usersService.findUser(getUserDto);
  // }
}
