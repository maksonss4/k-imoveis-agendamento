import { Request, Response, NextFunction } from "express";

export function authorizationUpdateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id: id_params } = req.params;
  const { id: id_token, isAdm: isAdm_token } = req.user;

  if (isAdm_token || id_params === id_token) {
    return next();
  }

  if (id_params !== id_token && !isAdm_token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // throw new AppError("Unauthorized", 403);
  return res.status(403).json({ message: "Unauthorized" });
}
