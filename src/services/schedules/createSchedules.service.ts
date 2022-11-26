import AppDataSource from "../../database/data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules_user_properties } from "../../entities/schedules_user_properties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

export async function createSchedulesService({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) {
  const schedulesRepository = AppDataSource.getRepository(
    Schedules_user_properties
  );
  const propertyRepository = AppDataSource.getRepository(Properties);
  const userRepository = AppDataSource.getRepository(User);

  const checkDay = new Date(date).getDay();
  const checkHour = new Date(`${date} ${hour}`).getHours();
  if (checkDay === 0 || checkDay === 6) {
    throw new AppError(400, "Não pode marcar no sábado ou domingo");
  }

  if (checkHour < 8 || checkHour > 17) {
    throw new AppError(400, "O horário deve estar entre 8 e 18");
  }

  const properties = await propertyRepository.find();
  const users = await userRepository.find();
  const propertyExist = properties.find((p) => p.id === propertyId);
  const userExist = users.find((u) => u.id === userId);

  if (!propertyExist) {
    throw new AppError(404, "A property não existe");
  }

  if (!userExist) {
    throw new AppError(404, "O usuário não existe");
  }

  const schedules = await schedulesRepository.find();

  const verifyDate = schedules.filter((s) => {
    const exist = new Date(`${s.date} ${s.hour}`);
    const novo = new Date(`${date} ${hour}`);
    return exist.toDateString() === novo.toDateString();
  });

  if (verifyDate.length > 0) {
    const verifyHour = verifyDate.filter((s) => {
      const exist = new Date(`${s.date} ${s.hour}`);
      const novo = new Date(`${date} ${hour}`);
      return (
        `${exist.getHours()}:${exist.getMinutes()}` ===
        `${novo.getHours()}:${novo.getMinutes()}`
      );
    });

    if (verifyHour.length > 0) {
      throw new AppError(400, "Data e hora já marcada");
    }
  }

  const newSchedule = schedulesRepository.create({
    date,
    hour,
    user: userExist,
    property: propertyExist,
  });
  await schedulesRepository.save(newSchedule);
  return { ...newSchedule, message: "Created" };
}
