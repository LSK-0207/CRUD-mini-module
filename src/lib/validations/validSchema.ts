import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email"),
});

export type UserInputSchema = z.infer<typeof userSchema>;

export const updateFormSchema = z.object({
  id: z.string().min(1, "User not found"),
  name: z.string().optional().or(z.literal("")),
  email: z.email("Invalid email address!").optional().or(z.literal("")),
});

export type UpdateFormSchema = z.infer<typeof updateFormSchema>;
