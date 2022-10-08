export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
}

export type UserCreate = Pick<IUser, 'name' | 'email' | 'password'>;
export type UserLogin = Pick<IUser, 'email' | 'password'>;
export type LoginToken = string;
export type UserPublic = Pick<IUser, '_id' | 'name' | 'email'>;
