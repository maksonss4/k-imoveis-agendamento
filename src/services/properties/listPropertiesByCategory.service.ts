import AppDataSource from "../../database/data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

export async function listPropertiesByCategoryService(id: string) {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const categories = await categoriesRepository.find();
  const categoriesId = categories.find((b) => b.id === id);

  if (!categoriesId) {
    throw new AppError(404, "Não existe a categoria");
  }

  return categoriesId;
}
