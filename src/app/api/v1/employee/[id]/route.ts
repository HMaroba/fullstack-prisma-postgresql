import { NextResponse } from "next/server";
import { prisma } from "../../auth/register/route";
export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const userAccount = await prisma.accounts.findUnique({
      where: { id },
    });
    return NextResponse.json({
      success: true,
      data: userAccount,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
