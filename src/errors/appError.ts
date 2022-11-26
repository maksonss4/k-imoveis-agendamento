import { Response } from "express";

export class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function handleError(err: AppError, res: Response) {
  const { statusCode, message } = err;

  if (err instanceof AppError) {
    return res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  }

  return res.status(500).json({ message: "Internal server error" });
}
