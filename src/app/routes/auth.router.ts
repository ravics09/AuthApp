import express, { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { signInLimiter } from "./../middlewares/rateLimiter";

import { authSchema } from "./../schema/authSchema";
import { withValidation } from "../common/decorators/authValidator";

export class AuthRouter {
  private authService = AuthService.getInstance();

  public static buildRouter() {
    const self = new AuthRouter();
    const expressRouter = express.Router();

    expressRouter.post("/signup", self.signup.bind(self));
    expressRouter.post("/signin", signInLimiter, self.signin.bind(self));
    expressRouter.post("/signout", self.signout.bind(self));
    return expressRouter;
  }

  @withValidation(authSchema.signup)
  private async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const newUser = await this.authService.createUser(
        username,
        email,
        password
      );
      res.status(201).json(newUser);
    } catch (error: any) {
      console.log("signup catch error:",error)
      res.status(400).json({ message: error.message });
    }
  }

  @withValidation(authSchema.signin)
  private async signin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.authenticateUser(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  private async signout(req: Request, res: Response): Promise<void> {}
}
