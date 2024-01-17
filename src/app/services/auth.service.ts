import bcrypt from "bcrypt";

import UserModel, { User } from "../models/user.model";
import { createAccessToken, createRefreshToken } from "./../utils/tokenUtils";
export class AuthService {
  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      // Check if the email is already registered
      const existingUser = await UserModel.findOne({ email }).lean().exec();
      if (existingUser) {
        throw new Error("Email already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      //save the database
      await newUser.save();

      //return the newUser
      return newUser;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("buffering timed out")
      ) {
        throw new Error("Database operation timed out");
      } else {
        // Handle other errors
        throw new Error(`An unexpected error occurred ${error}`);
      }
    }
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      // Check if the user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Create and return a JWT token
      const accessToken = createAccessToken(user._id, user.email); // return token info

      // Create and return a refreshToken
      const refreshToken = createRefreshToken(user._id);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error("Could not signin");
    }
  }
}
