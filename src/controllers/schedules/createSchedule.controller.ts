import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { createSchedulesService } from "../../services/schedules/createSchedules.service";

export async function createSchedulesController(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { date, hour, propertyId } = req.body;
    const newSchedule = await createSchedulesService({
      date,
      hour,
      propertyId,
      userId,
    });
    const scheduleWithMessage = { ...newSchedule, message: "Created" };

    return res.status(201).json(scheduleWithMessage);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
}
