import { UserController } from './../../../../libs/core/src/lib/user/user.controller';
import { Router } from 'express';

export enum UsersEndpoint {
  REGISTER = '/register',
}

const userController = new UserController();
const router = Router();

router.post(
  '/register',
  UserController.createExpressCallback(userController.register)
);

router.post(
  '/login',
  UserController.createExpressCallback(userController.login)
);
export default router;
