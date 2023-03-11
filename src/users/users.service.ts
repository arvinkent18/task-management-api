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
   * @throws {InternalServerErrorException} If there is an internal server error.
   * @returns {Promise<User>} The newly created user.
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;

    if (await this.findUser(username)) {
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
  async findUser(username: string): Promise<User | null> {
    console.log('username', username);
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      return null;
    }

    return user;
  }
}
