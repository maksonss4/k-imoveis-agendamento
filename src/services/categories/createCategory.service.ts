import AppDataSource from "../../database/data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

export async function createCategoryService(name: string) {
  if (!name) {
    throw new AppError(400, "name is required");
  }

  const categoriesRepository = AppDataSource.getRepository(Categories);
  const categoriesAlreadyExists = await categoriesRepository.findOne({
    where: {
      name,
    },
  });

  if (categoriesAlreadyExists) {
    throw new AppError(400, "Category already exists");
  }

  const category = new Categories();
  category.name = name;

  categoriesRepository.create(category);
  await categoriesRepository.save(category);

  return category;
}
