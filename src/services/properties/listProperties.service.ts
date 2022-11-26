import AppDataSource from "../../database/data-source";
import { Properties } from "../../entities/properties.entity";

export async function listPropertiesService() {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const properties = await propertiesRepository.find();
  return properties;
}
