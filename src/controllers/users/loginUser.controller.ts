import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { loginUserService } from "../../services/users/loginUser.service";

export async function loginUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await loginUserService({ email, password });
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
