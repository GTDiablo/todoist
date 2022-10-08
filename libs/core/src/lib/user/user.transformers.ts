import { IUser, UserPublic } from '@todoist/api-interfaces';

export const transformToPublicUser = (user: IUser): UserPublic => ({
  _id: user._id,
  email: user.email,
  name: user.name,
});
