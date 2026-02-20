import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  price: z
    .number({
      error: (issue) =>
        issue.input === undefined || typeof issue.input !== "number"
          ? "Price must be a number"
          : undefined,
    })
    .positive("Price must be greater than 0"),
  quantity: z
    .number({
      error: (issue) =>
        issue.input === undefined || typeof issue.input !== "number"
          ? "Quantity must be a number"
          : undefined,
    })
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  quantity: z.number().int().nonnegative().optional(),
});
