import { Types } from 'mongoose';
import { UserStatus } from '../user-status.enum';
import { User } from '../user.interface';
import * as bcrypt from 'bcrypt';

export const mockUser: User = {
  _id: new Types.ObjectId(),
  username: 'admin',
  password: bcrypt.hashSync('admin', 10),
  status: UserStatus.INACTIVE,
};

export const mockUserModel = {
  create: jest.fn().mockResolvedValueOnce(mockUser),
  findOne: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValueOnce(mockUser),
  save: jest.fn().mockResolvedValueOnce(mockUser),
};

jest.spyOn(mockUserModel, 'findOne').mockReturnValueOnce({
  select: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValueOnce(null),
});
