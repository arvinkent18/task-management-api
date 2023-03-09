import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { DB_USER_MODEL, ERR_UNPROCESSABLE_ENTITY } from '../constants';
import { mockUser, mockUserModel } from './mocks/users.mock';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../common/helpers/password-hashing';
import { UnprocessableEntityException } from '@nestjs/common';
import { User } from './user.interface';

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
      mockUserModel.findOne.mockReturnValueOnce(null);

      const createdUser: User = await usersService.createUser(createUserDto);

      expect(createdUser).toEqual(mockUser);
      expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        username: createUserDto.username,
      });
    });

    it('should throw UnprocessableEntityException if user already exists', async () => {
      const existingUser = { ...mockUser };
      jest
        .spyOn(usersService, 'findUser')
        .mockResolvedValueOnce(existingUser);

      const createUserDto: CreateUserDto = {
        username: 'admin',
        password: await hashPassword('admin'),
      };

      await expect(usersService.createUser(createUserDto)).rejects.toThrow(
        new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY),
      );
    });
  });
});
