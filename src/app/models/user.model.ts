import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const UserModel = model<User>('User', UserSchema);
export default UserModel;