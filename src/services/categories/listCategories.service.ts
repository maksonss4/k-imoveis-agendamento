import AppDataSource from "../../database/data-source";
import { Categories } from "../../entities/categories.entity";

export async function listCategoriesService() {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const categories = await categoriesRepository.find();

  return categories;
}
