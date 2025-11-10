import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "Live pricing API not yet available",
      status: 501,
    },
    { status: 501 }
  );
}

