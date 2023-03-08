import { UserStatus } from '../user-status.enum';
import { User } from '../user.interface';

export const mockUser: User = {
  username: 'admin',
  password: 'admin',
  status: UserStatus.INACTIVE,
};

export const mockUserModel = {
  // new: jest.fn().mockResolvedValue(mockUser),
  // constructor: jest.fn().mockResolvedValue(mockUser),
  // find: jest.fn(),
  create: jest.fn(),
  exec: jest.fn(),
};
