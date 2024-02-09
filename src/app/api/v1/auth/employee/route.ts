import { NextRequest } from "next/server";
import { prisma } from "../register/route";

export async function Post(request: NextRequest) {
  try {
    const { first_name, last_name } = await request.json();
  } catch (error) {}
}
