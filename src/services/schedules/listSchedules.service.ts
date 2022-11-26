import AppDataSource from "../../database/data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

export const listSchedulesFromPropertyService = async (id: string) => {
  if (!id) {
    throw new AppError(404, "Id invalid");
  }
  const propertyRepository = AppDataSource.getRepository(Properties);
  const properties = await propertyRepository.find();
  const property = properties.find((property) => property.id === id);
  if (property) {
    return property;
  }
  throw new AppError(404, "Not exist property");
};
