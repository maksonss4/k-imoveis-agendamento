import { User } from "../../entities/user.entity";
import { IUserCreate, IUserNoPassword } from "../../interfaces/users";
import AppDataSource from "../../database/data-source";
import { AppError } from "../../errors/appError";

export async function createUserService(newUser: IUserCreate) {
  const { email, isActive, isAdm, name, password } = newUser;
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.isActive = isActive;
  user.isAdm = isAdm;
  user.password = password;

  userRepository.create(user);
  await userRepository.save(user);

  const newUserNoPassword: IUserNoPassword = { ...user };
  delete newUserNoPassword.password;

  return newUserNoPassword;
}
