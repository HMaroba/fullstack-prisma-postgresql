import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../register/route";

export async function POST(request: NextRequest) {
  try {
    const { first_name, last_name, email, accounts } = await request.json();

    const employeeData = await prisma.employee.create({
      data: {
        first_name,
        last_name,
        email,
        accounts: {
          create: accounts,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registration Successfully",
      status: 201,
      data: employeeData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      status: 500,
    });
  }
}
