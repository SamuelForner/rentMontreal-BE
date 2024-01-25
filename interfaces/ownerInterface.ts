import { Request } from 'express';

export interface Iowner {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IGetUserAuthInfoRequest extends Request {
  owner: string;
}
