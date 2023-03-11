import { GetUserDto } from './dto/get-user.dto';
import { User } from './user.interface';
import {
  Injectable,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  /**
   * Creates a new user based on the given user data.
   *
   * @param {CreateUserDto} createUserDto - The data for the user to create.
   * @throws {UnprocessableEntityException} If the user already exists.
   * @returns {Promise<User>} The newly created user.
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const existingUser = await this.findUser({ username });

    if (existingUser) {
      throw new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY);
    }

    return this.userModel.create(createUserDto);
  }

  /**
   * Checks whether a user with the given username exists.
   *
   * @param {string} username - The username to check.
   * @returns {Promise<User | null>} The user with the given username, or null if it does not exist.
   */
  async findUser(getUserDto: GetUserDto): Promise<User | null> {
    const { username } = getUserDto;
    const user: User | null = await this.userModel.findOne({ username });
    if (!user) {
      return null;
    }
  
    return user;
  }
}
