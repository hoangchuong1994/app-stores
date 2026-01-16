import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "name.required"),
  email: z.string().email("email.invalid"),
  password: z.string().min(6, "password.min"),
});

export type RegisterValues = z.infer<typeof registerSchema>;
