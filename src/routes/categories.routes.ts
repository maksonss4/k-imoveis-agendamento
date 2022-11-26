import { Router } from "express";
import { verifyUserAdmMiddleware } from "../middlewares/verifyUserAdm.middleware";
import { authUserMiddleware } from "../middlewares/verifyAuthToken.middleware";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { listCategoriesController } from "../controllers/categories/listCategories.controller";

export const categoriesRoutes = Router();

categoriesRoutes.post(
  "/categories",
  authUserMiddleware,
  verifyUserAdmMiddleware,
  createCategoryController
);

categoriesRoutes.get("/categories", listCategoriesController);
