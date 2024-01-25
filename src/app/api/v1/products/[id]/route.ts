import { NextResponse } from "next/server";

export async function Get() {
  try {

  } catch (error) {
    return NextResponse.json({
        message : 'Something went wrong',
        status : 500,
    })
  }
}
