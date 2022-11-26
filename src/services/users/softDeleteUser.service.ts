import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

export async function softDeleteUserService(id: string) {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (!findUser.isActive) {
    throw new AppError(400, "Inactive user");
  }

  await userRepository.update(id, { isActive: false, updatedAt: new Date() });
}
