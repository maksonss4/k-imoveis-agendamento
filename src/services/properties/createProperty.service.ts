import AppDataSource from "../../database/data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

export async function createPropertyService({
  address,
  categoryId,
  size,
  value,
}: IPropertyRequest) {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const addressesRespository = AppDataSource.getRepository(Addresses);

  if (address.state.length > 2) {
    throw new AppError(400, "Max 2 caracteres no state");
  }
  if ((address.zipCode + "").length > 8) {
    throw new AppError(400, "Max 8 caracteres no zip code");
  }

  const category = await categoriesRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const { city, district, number, state, zipCode } = address;

  const baseAddress = await addressesRespository.find();
  const existZipCodeAddress = baseAddress.filter((a) => {
    return a.zipCode === zipCode + "";
  });

  if (existZipCodeAddress.length > 0) {
    const existNumberZipCode = existZipCodeAddress.find((a) => {
      return a.number === number + "";
    });

    if (existNumberZipCode) {
      throw new AppError(400, "Propriedade já existe");
    }
  }

  const newAddress = new Addresses();
  newAddress.city = city;
  newAddress.district = district;
  newAddress.number = number;
  newAddress.state = state;
  newAddress.zipCode = zipCode;

  addressesRespository.create(newAddress);
  await addressesRespository.save(newAddress);

  const property = new Properties();
  property.size = size;
  property.value = value;
  property.category = category;
  property.address = newAddress;

  propertiesRepository.create(property);
  await propertiesRepository.save(property);

  return property;
}
