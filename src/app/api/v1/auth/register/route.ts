import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import { z } from "zod";

// Define the schema for the request body using Zod
const userSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  phoneNumber: z.string().regex(/^\d{8}$/, {
    message: "Invalid phone number, should be 8 numeric characters",
  }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      userSchema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request body", details: error },
        { status: 400 }
      );
    }
    
    const { firstName, lastName, emailAddress } = body;
    const userExists = await prisma.user.findUnique({
      where: { emailAddress },
    });
    if (userExists) {
      return NextResponse.json({
        message: "User already exists",
        status: 409,
      });
    }

    const userData = await prisma.user.create({
      data: { firstName, lastName, emailAddress },
    });

    return NextResponse.json({
      status: 201,
      message: "User created successfully",
      userDetails: userData,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}
