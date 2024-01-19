import { NextResponse } from "next/server";
import { prisma } from "../auth/register/route";

import { z } from "zod";

// Define the schema for the request body using Zod
const productSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  price: z.number().min(1, { message: "Price is required" }),
  userId: z.number().min(1, { message: "Price is required" }),
});

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

    const { productName, description, price, image, userId } = body;

    const userExists = await prisma.user.findUnique({
      where: { id : userId },
    });
    if (!userExists) {
      return NextResponse.json({
        message: "User does not exists",
        status: 409,
      });
    }

    const userData = await prisma.product.create({
      data: { productName, description, price, image },
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
