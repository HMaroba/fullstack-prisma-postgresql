import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../register/route";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const { first_name, last_name, email, accounts } = await request.json();

    const userExits = await prisma.employee.findUnique({ where: { email } });

    if (userExits) {
      NextResponse.json({
        success: false,
        message: "User with this email address exists",
        status: 409,
      });
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
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}

export const GET = limiter(async function () {
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
});
