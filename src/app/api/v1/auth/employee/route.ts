import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../register/route";

export async function POST(request: NextRequest) {
  try {
    const { first_name, last_name, email, accounts } = await request.json();

    const userExits = await prisma.employee.findUnique({ where: {email}});

    if (userExits) {
      NextResponse.json({
        success : false,
        message : 'User with this email address exists',
        status : 409,
      })
    }

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
      message: "Something went wrong" +error,
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const getEmployees = await prisma.employee.findMany();

    const employeesAccounts = await prisma.employee.findMany({
      include: {
        accounts: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: employeesAccounts,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      status: 500,
    });
  }
}
