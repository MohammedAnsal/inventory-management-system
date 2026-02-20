import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters")
    .regex(/\S/, "Name cannot be only spaces"),
  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  quantity: z
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative"),
});

export type ProductFormValues = z.infer<typeof createProductSchema>;
