import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { createCategoryService } from "../../services/categories/createCategory.service";

export async function createCategoryController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const newCategory = await createCategoryService(name);
    return res.status(201).json(newCategory);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
