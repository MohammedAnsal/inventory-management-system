import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { HttpStatus, responseMessage } from "../enums/http.status";

/**
 * Reusable middleware for validating request data using Zod schemas
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
export const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          field: (err.path ?? []).join("."),
          message: err.message,
        }));

        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: responseMessage.INVALID_INPUT,
          errors: errorMessages,
        });
        return;
      }

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: responseMessage.ERROR_MESSAGE,
      });
    }
  };
