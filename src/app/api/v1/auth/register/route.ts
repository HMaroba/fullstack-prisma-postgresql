import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
