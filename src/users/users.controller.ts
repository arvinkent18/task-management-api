import { Body, Controller, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  
  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiQuery({
    type: CreateUserDto,
  })
  @Post()
  async findUser(@Query('username') getUserDto: GetUserDto): Promise<User> {
    return this.usersService.findUser(getUserDto);
  }
}
