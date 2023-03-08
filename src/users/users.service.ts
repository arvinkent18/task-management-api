import { User } from './user.interface';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DB_USER_MODEL, ERR_UNPROCESSABLE_ENTITY } from '../constants';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(DB_USER_MODEL) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;

    if (this.checkIfUserExists(username)) {
      throw new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY);
    }

    return new this.userModel({ ...createUserDto }).save();
  }

  async checkIfUserExists(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }
}
