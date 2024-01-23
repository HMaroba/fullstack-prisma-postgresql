import { z } from "zod";

// Define the schema for the request body using Zod
export const userSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  phoneNumber: z.string().regex(/^\d{8}$/, {
    message: "Invalid phone number, should be 8 numeric characters",
  }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});
