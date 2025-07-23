// schemas/user.schema.ts
import * as z from "zod";

export const verifyuserinfo = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  userName: z.string().min(1, "Username is required"),
  emailAddress: z.email("Invalid email address"),
  passWord: z.string().min(6, "Password must be at least 6 characters"),
});
