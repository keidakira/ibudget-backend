import User from "../models/user.model";
import { sign } from "jsonwebtoken";

export const register = async ({name, email, password}) => {
  const user = await User.create({
    name,
    email,
    password,
  });

  const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
};