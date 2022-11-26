import { Request, Response } from "express";
import { listPropertiesService } from "../../services/properties/listProperties.service";

export async function listPropertiesController(req: Request, res: Response) {
  const properties = await listPropertiesService();
  return res.status(200).json(properties);
}
