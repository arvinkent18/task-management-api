import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { User } from 'users/user.interface';
import { UsersService } from 'users/users.service';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
