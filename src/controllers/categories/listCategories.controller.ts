import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { listCategoriesService } from "../../services/categories/listCategories.service";

export async function listCategoriesController(req: Request, res: Response) {
  try {
    const categories = await listCategoriesService();

    return res.status(200).json(categories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
