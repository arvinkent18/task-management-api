import { mockUser } from './user-data.mock';

export const mockUserModel = {
  create: jest.fn().mockResolvedValueOnce(mockUser),
  findOne: jest.fn().mockReturnValue(mockUser),
  exec: jest.fn().mockResolvedValueOnce(mockUser),
  save: jest.fn().mockResolvedValueOnce(mockUser),
};
