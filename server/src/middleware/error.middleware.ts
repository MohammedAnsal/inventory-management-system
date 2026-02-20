import { Request, Response, NextFunction } from "express";
import { HttpStatus, responseMessage } from "../enums/http.status";

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern)[0];
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    });
    return;
  }

  if ((err as any).name === "ValidationError") {
    const errors = Object.values((err as any).errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));

    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: responseMessage.INVALID_INPUT,
      errors,
    });
    return;
  }

  console.error("Error:", err);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: responseMessage.ERROR_MESSAGE,
  });
};
