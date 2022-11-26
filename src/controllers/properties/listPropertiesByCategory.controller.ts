import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { listPropertiesByCategoryService } from "../../services/properties/listPropertiesByCategory.service";

export async function listPropertiesByCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const propertiesCategory = await listPropertiesByCategoryService(id);
    return res.status(200).json(propertiesCategory);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
