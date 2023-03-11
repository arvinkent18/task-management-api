import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { getModelToken } from '@nestjs/mongoose';
import { DB_USER_MODEL, ERR_UNPROCESSABLE_ENTITY } from '../constants';
import { UnprocessableEntityException } from '@nestjs/common';
import { mockUser } from './mocks/user-data.mock';
import { mockUserModel } from './mocks/user-model.mock';
import { GetUserDto } from './dto/get-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(DB_USER_MODEL),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'admin',
        password: 'admin',
      };

      jest.spyOn(usersService, 'createUser').mockResolvedValue(mockUser);

      const result = await usersController.createUser(createUserDto);

      expect(result).toEqual(mockUser);
    });

    it('should throw UnprocessableEntityException when create user fails with "Unprocessable Entity" error', async () => {
      const createUserDto: CreateUserDto = {
        username: 'admin',
        password: 'admin',
      };

      jest
        .spyOn(usersService, 'createUser')
        .mockRejectedValue(
          new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY),
        );

      await expect(
        usersController.createUser(createUserDto),
      ).rejects.toThrowError(UnprocessableEntityException);
    });
  });

  describe('findUser', () => {
    it('should return a user when found', async() => {
      const getUserDto: GetUserDto = {
        username: 'admin',
      };
      
      jest.spyOn(usersService, 'findUser').mockResolvedValue(mockUser);

      const user = await usersController.findUser(getUserDto);
      
      expect(usersService.findUser).toHaveBeenCalledWith(getUserDto);
      expect(user).toEqual(mockUser);
    });

    it('should return null if no user is found', async() => {
      const getUserDto: GetUserDto = {
        username: 'unknown',
      };
      
      jest.spyOn(usersService, 'findUser').mockResolvedValue(null);

      const user = await usersController.findUser(getUserDto);
      
      expect(usersService.findUser).toHaveBeenCalledWith(getUserDto);
      expect(user).toBeNull()
    });
  })
});
