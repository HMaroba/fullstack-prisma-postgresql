import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(params);
  try {
    await prisma.$connect();

    const productId = await prisma.product.findFirst({
      where: { id },
    });

    if (!productId) {
      return NextResponse.json({
        message: "Product does not exists",
        status: 404,
      });
    }

    const response = await prisma.product.findFirst({
      where: { id },
    });
    return NextResponse.json({
      status: 200,
      productData: response,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}

export async function PUT({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}
