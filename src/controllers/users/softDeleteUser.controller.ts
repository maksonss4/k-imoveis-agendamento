import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { softDeleteUserService } from "../../services/users/softDeleteUser.service";

export async function softDeleteUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await softDeleteUserService(id);

    return res.status(204).json({ message: "Delete" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
