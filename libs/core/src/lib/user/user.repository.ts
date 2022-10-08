import { transformToPublicUser } from './user.transformers';
import {
  UserCreate,
  UserLogin,
  IUser,
  LoginToken,
  UserPublic,
} from '@todoist/api-interfaces';
//
import { UserModel } from './user.model';

export interface IUserRepository {
  findById(userId: IUser['_id']): Promise<IUser | undefined | null>;
  register(userData: UserCreate): Promise<UserPublic>;
  login(userData: UserLogin): Promise<LoginToken>;
  list(): Promise<IUser[]>;
}

type ModelType = typeof UserModel;

export class UserRepository implements IUserRepository {
  private _model: ModelType = UserModel;

  async list(): Promise<IUser[]> {
    return this._model.find();
  }

  async findById(userId: any): Promise<IUser | null | undefined> {
    return this._model.findById(userId);
  }

  async register(userData: UserCreate): Promise<UserPublic> {
    const storedUser = await this._model.findOne({ email: userData.email });

    if (storedUser) {
      throw new Error('User already exists with this email!');
    }

    const hashedPassword = userData.password;
    const cleanUserData: UserCreate = {
      ...userData,
      password: hashedPassword,
    };

    const user = new this._model(cleanUserData);
    await user.save();

    return transformToPublicUser(user);
  }

  async login(userData: UserLogin): Promise<LoginToken> {
    const user = await this._model.findOne({ email: userData.email });

    if (!user) {
      throw new Error('Wrong email or password!');
    }

    if (user.password !== userData.password) {
      throw new Error('Wrong email or password 2!');
    }

    return 'randomApiKey';
  }
}
