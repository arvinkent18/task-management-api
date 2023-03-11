import { UserStatus } from '../user-status.enum';
import { User } from '../user.interface';
import * as bcrypt from 'bcrypt';

export const mockUser: User = {
  username: 'admin',
  password: bcrypt.hashSync('admin', 10),
  status: UserStatus.Inactive,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockUserModel = {
  create: jest.fn().mockResolvedValueOnce(mockUser),
  findOne: jest.fn().mockReturnValue(mockUser),
  exec: jest.fn().mockResolvedValueOnce(mockUser),
  save: jest.fn().mockResolvedValueOnce(mockUser),
};