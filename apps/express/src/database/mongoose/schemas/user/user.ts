import { User } from '@demo/rest-api-models';
import { Schema } from 'mongoose';

export const userSchema = new Schema<User>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
