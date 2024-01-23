import { NextResponse } from "next/server";
import { prisma } from "../auth/register/route";

export async function GET() {
  try {
    const userswithProducts = await prisma.user.findMany({
      include: {
        products: true,
      },
    });
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, id } = body;

    const userExists = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      return NextResponse.json({
        message: "User does not exists",
        status: 404,
      });
    }

    const updateUser = await prisma.user.update({
      data: { firstName, lastName },
      where: {id},
    });
    return NextResponse.json({
      success: true,
      message: "User update Successfully",
      details: updateUser,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong try again" + error,
      success: false,
      status: 500,
    });
  }
}
