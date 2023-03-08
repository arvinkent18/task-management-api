import { UserStatus } from '../user-status.enum';
import { User } from '../user.interface';

export const mockUser: User = {
  username: 'admin',
  password: 'admin',
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
