import { NextResponse } from "next/server";
import { prisma } from "../auth/register/route";
import { productSchema } from "@/app/helpers/schemaValidations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      productSchema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request body", details: error },
        { status: 400 }
      );
    }
    await prisma.$connect();
    
    const { productName, description, price, image, userId } = body;

    const userExists = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!userExists) {
      return NextResponse.json({
        message: "User does not exists",
        status: 409,
      });
    }

    const userData = await prisma.product.create({
      data: { productName, description, price, image, userId },
    });

    return NextResponse.json({
      status: 201,
      message: "Product created successfully",
      userDetails: userData,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    if (!products) {
      return NextResponse.json({
        message: "No products available",
        status: 409,
      });
    }

    return NextResponse.json({
      success: true,
      productList: products,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}
