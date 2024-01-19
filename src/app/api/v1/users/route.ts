import { NextResponse } from "next/server";
import { prisma } from "../auth/register/route";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return NextResponse.json({
        message: "No users available",
        status: 409,
      });
    }

    return NextResponse.json({
      success: true,
      userList: users,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}
