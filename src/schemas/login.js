import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .regex(/^[\w\-.]+@stud\.noroff\.no$/, {
      message:
        "Please use a valid Noroff student email address (@stud.noroff.no)",
    }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default loginSchema;
