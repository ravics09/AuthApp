import { Router, Request, Response } from "express";
import { AuthService } from '../services/auth.service';

const router: Router = Router();
const authService = new AuthService(); // Instantiate the AuthService

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await authService.createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router;