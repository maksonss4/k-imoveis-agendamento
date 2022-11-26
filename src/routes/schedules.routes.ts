import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules/createSchedule.controller";
import { listSchedulesFromPropertyController } from "../controllers/schedules/listSchedules.controller";
import { authUserMiddleware } from "../middlewares/verifyAuthToken.middleware";
import { verifyUserAdmMiddleware } from "../middlewares/verifyUserAdm.middleware";

export const schedulesRoutes = Router();

schedulesRoutes.post(
  "/schedules",
  authUserMiddleware,
  createSchedulesController
);

schedulesRoutes.get(
  "/schedules/properties/:id",
  authUserMiddleware,
  verifyUserAdmMiddleware,
  listSchedulesFromPropertyController
);
