import { Router } from "express";
import { createPropertyController } from "../controllers/properties/createProperty.controller";
import { listPropertiesController } from "../controllers/properties/listProperties.controller";
import { listPropertiesByCategoryController } from "../controllers/properties/listPropertiesByCategory.controller";
import { authUserMiddleware } from "../middlewares/verifyAuthToken.middleware";
import { verifyUserAdmMiddleware } from "../middlewares/verifyUserAdm.middleware";

export const propertiesRoutes = Router();

propertiesRoutes.post(
  "/properties",
  authUserMiddleware,
  verifyUserAdmMiddleware,
  createPropertyController
);

propertiesRoutes.get("/properties", listPropertiesController);

propertiesRoutes.get(
  "/categories/:id/properties",
  listPropertiesByCategoryController
);
