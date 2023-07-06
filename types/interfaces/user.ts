import { Model } from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  password?: string;
}

export interface IUserModelMethods {
  // eslint-disable-next-line no-unused-vars
  comparePassword(enteredPassowrd: string): boolean;
}

export interface IUserStatics {
  createPassword(): void;
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  hashPassword: (password: string) => string;
}
