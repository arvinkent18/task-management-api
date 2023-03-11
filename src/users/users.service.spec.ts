import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { DB_USER_MODEL, ERR_UNPROCESSABLE_ENTITY } from '../constants';
import { mockUser, mockUserModel } from './mocks/users.mock';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { User } from './user.interface';
import { GetUserDto } from './dto/get-user.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { hashPassword } from '../common/helpers/password-hashing';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(DB_USER_MODEL),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    userModel = moduleRef.get<Model<UserDocument>>(
      getModelToken(DB_USER_MODEL),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'admin',
        password: await hashPassword('admin'),
      };

      jest.spyOn(mockUserModel, 'findOne').mockReturnValueOnce(null);
      mockUserModel.create = jest.fn().mockReturnValueOnce(mockUser);

      const createdUser: User = await usersService.createUser(createUserDto);

      expect(createdUser).toEqual(mockUser);
      expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        username: createUserDto.username,
      });
    });

    it('should throw UnprocessableEntityException if user already exists', async () => {
      const existingUser = { ...mockUser };
      jest.spyOn(usersService, 'findUser').mockResolvedValueOnce(existingUser);

      const createUserDto: CreateUserDto = {
        username: 'admin',
        password: await hashPassword('admin'),
      };

      await expect(usersService.createUser(createUserDto)).rejects.toThrow(
        new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('findUser', () => {
    it('should return a user if found', async () => {
      const getUserDto: GetUserDto = { username: mockUser.username };

      mockUserModel.findOne = jest.fn().mockImplementation((query) => {
        return query.username === mockUser.username ? mockUser : null;
      });

      const user: User | null = await usersService.findUser(getUserDto);

      expect(user).toEqual(mockUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        username: getUserDto.username,
      });
    });

    it('should return null if no user is found', async () => {
      const getUserDto: GetUserDto = { username: 'unknown' };
      const user = await usersService.findUser(getUserDto);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        username: getUserDto.username,
      });
      expect(user).toBeNull();
    });
  });
});
