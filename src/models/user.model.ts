import { Schema, model } from "mongoose";

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export default model<IUser>("User", UserSchema);
