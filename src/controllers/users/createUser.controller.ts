import { createUserService } from "../../services/users/createUser.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

export async function createUserController(req: Request, res: Response) {
  try {
    const { name, email, password, isAdm, isActive } = req.validatedBody;
    const newUser = await createUserService({
      name,
      email,
      password,
      isAdm,
      isActive,
    });

    return res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
