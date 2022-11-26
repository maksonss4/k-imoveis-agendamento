import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { createPropertyService } from "../../services/properties/createProperty.service";

export async function createPropertyController(req: Request, res: Response) {
  try {
    const { value, size, address, categoryId } = req.body;
    const newProperty = await createPropertyService({
      value,
      size,
      address,
      categoryId,
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
