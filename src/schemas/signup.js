import { z } from "zod";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "Name must not contain punctuation symbols apart from underscore (_)",
      }),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z
      .string()
      .min(8, "Password confirm must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], // Path of error
  });

export default signupSchema;
