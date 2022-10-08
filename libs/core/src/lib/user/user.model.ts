import { Schema, model } from 'mongoose';
//
import { IUser } from '@todoist/api-interfaces';

const USER_DOCUMENT_NAME = 'User';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model(USER_DOCUMENT_NAME, UserSchema);
