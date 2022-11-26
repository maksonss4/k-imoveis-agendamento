import { Request, Response } from "express";
import { listSchedulesFromPropertyService } from "../../services/schedules/listSchedules.service";

export const listSchedulesFromPropertyController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const schedule = await listSchedulesFromPropertyService(id);
  return res.json(schedule);
};
