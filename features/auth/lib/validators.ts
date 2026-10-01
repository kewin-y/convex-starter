import { z } from "zod";

export const loginSchema = z.object({
  name: z.string(),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  password: z.string().min(1, "Enter your password."),
  confirmPassword: z.string(),
});

export const signupSchema = loginSchema
  .extend({
    name: z.string().trim().min(1, "Enter your name."),
    password: loginSchema.shape.password.pipe(
      z.string().min(8, "Use at least 8 characters."),
    ),
  })
  .refine((value) => value.confirmPassword === value.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type AuthFormValues = z.input<typeof loginSchema>;

export const authSchemas: Record<
  "signIn" | "signUp",
  z.ZodType<AuthFormValues, AuthFormValues>
> = {
  signIn: loginSchema,
  signUp: signupSchema,
};

export const defaultAuthValues: AuthFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
