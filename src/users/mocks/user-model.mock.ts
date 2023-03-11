import { mockUser } from "./users.mock";

export class UserModel {
  public static findOne = jest.fn(() => ({
    exec: jest.fn().mockResolvedValueOnce(mockUser),
  }));
  public save = jest.fn().mockResolvedValueOnce(mockUser);
}