import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { userSchema } from "@/app/helpers/schemaValidations";
export const prisma = new PrismaClient();

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
