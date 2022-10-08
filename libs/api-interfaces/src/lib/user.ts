export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
}

export type UserCreate = Pick<IUser, 'name' | 'email' | 'password'>;
