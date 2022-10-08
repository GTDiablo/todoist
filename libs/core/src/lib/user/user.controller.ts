import { ApiResponse } from './../api/response';
import {
  UserCreate,
  IApiResponse,
  UserPublic,
  UserLogin,
  LoginToken,
} from '@todoist/api-interfaces';
import { UserRepository } from './user.repository';
import { Request, Response } from 'express';

export interface IUserHttpRequest<Body> {
  params: any;
  body: Body;
  query: any;
  headers: {
    [key: string]: string;
  };
}

export interface IUserController {
  register(
    request: IUserHttpRequest<UserCreate>
  ): Promise<IApiResponse<UserPublic>>;

  login(
    request: IUserHttpRequest<UserLogin>
  ): Promise<IApiResponse<LoginToken>>;
}

export class UserController implements IUserController {
  private _userRep = new UserRepository();

  register = async (
    request: IUserHttpRequest<UserCreate>
  ): Promise<IApiResponse<UserPublic>> => {
    const response = new ApiResponse<UserPublic>();

    response.status = 200;

    try {
      const user = await this._userRep.register(request.body);
      response.payload = user;
    } catch (error) {
      response.status = 400;
      response.error = (error as Error).message;
    }

    return response;
  };

  login = async (
    request: IUserHttpRequest<UserLogin>
  ): Promise<IApiResponse<string>> => {
    const response = new ApiResponse<LoginToken>();

    response.status = 200;

    try {
      const loginToken = await this._userRep.login(request.body);
      response.payload = loginToken;
    } catch (error) {
      response.status = 400;
      response.error = (error as Error).message;
    }

    return response;
  };

  public static createExpressCallback(
    controller: (
      userHttpRequest: IUserHttpRequest<any>
    ) => Promise<IApiResponse<any>>
  ) {
    return (req: Request, res: Response) => {
      const userHttpRequest: IUserHttpRequest<any> = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: {},
      };

      controller(userHttpRequest).then((response: IApiResponse<any>) => {
        res.status(response.status).json(response);
      });
    };
  }
}
