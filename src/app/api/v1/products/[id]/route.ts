import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function Get(params: { id: string }) {
  try {
    const { id } = params;

    const productId = await prisma.product.findUnique({ where: { id } });

    if (!productId) {
      return NextResponse.json({
        message: "Product does not exists",
        status: 404,
      });
    }

    const response = await prisma.product.findUnique({ where: { id } });
    return NextResponse.json({
      status: 200,
      productData: response,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
