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

// Define the schema for the request body using Zod
export const productSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  price: z.number().min(1, { message: "Price is required" }),
  userId: z.string().min(1, { message: "User id is required" }),
});
