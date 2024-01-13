import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel, { User } from "../models/user.model";

const authService = {
  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      // Check if the email is already registered
      const existingUser = await UserModel.findOne({ email });
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
      throw new Error("Could not create user");
    }
  },

  async authenticateUser(
    email: string,
    password: string
  ): Promise<string | null> {
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
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "your_secret_key",
        { expiresIn: "1h" }
      );

      // return token info
      return token;
    } catch (error) {
      throw new Error("Could not signin");
    }
  },
};

export default authService;
