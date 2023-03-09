import { hashPassword } from '../common/helpers/password-hashing';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { mockUsersService, mockJwtService } from './mocks/auth.mock';
import { RegisterDto } from './dto/register.dto';
import { mockUser } from '../users/mocks/users.mock';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { ERR_UNPROCESSABLE_ENTITY } from '../constants';
import { Payload } from './payload.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user account', async () => {
      const registerDto: RegisterDto = {
        username: 'admin',
        password: await hashPassword('admin'),
      };
      jest.spyOn(usersService, 'createUser').mockResolvedValueOnce(mockUser);

      const registeredUser = await authService.register(registerDto);

      expect(registeredUser).toEqual(mockUser);
      expect(usersService.createUser).toHaveBeenCalledWith(registerDto);
    });

    it('should throw UnprocessableEntityException when registering user fails with "Unprocessable Entity" error', async () => {
      const registerDto: RegisterDto = {
        username: 'admin',
        password: await hashPassword('admin'),
      };

      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(
          new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY),
        );

      await expect(authService.register(registerDto)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
  });

  describe('login', () => {
    it('should return a JWT token when given valid credentials', async () => {
      const loginDto: LoginDto = {
        username: 'admin',
        password: 'admin',
      };
      jest.spyOn(usersService, 'findUser').mockResolvedValue(mockUser);
      const payload: Payload = {
        _id: mockUser._id,
        username: mockUser.username,
      };
      (jwtService.signAsync as jest.Mock).mockResolvedValue('testtoken');

      const result = await authService.login(loginDto);

      expect(result).toBeDefined();
      expect(result.accessToken).toEqual('testtoken');
      expect(usersService.findUser).toHaveBeenCalledWith(
        loginDto.username,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith(payload);
    });

    it('should throw an error when given invalid credentials', async () => {
      const loginDto = { username: 'admin', password: '' };
      jest.spyOn(usersService, 'findUser').mockResolvedValueOnce(null);

      await expect(authService.login(loginDto)).rejects.toThrowError();
      expect(usersService.findUser).toHaveBeenCalledWith(
        loginDto.username,
      );
    });
  });
});
