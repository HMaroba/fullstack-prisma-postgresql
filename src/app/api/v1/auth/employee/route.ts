import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../register/route";
import { NextApiResponse } from "next";
import rateLimit from "@/app/utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

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

export async function GET(res: NextApiResponse) {
  try {
    await limiter.check(res, 1, "CACHE_TOKEN"); // 10 requests per minute
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
      message: "Something went wrong" +error,
      status: 500,
    });
  }
}
