import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await conn`
    SELECT NOW() as now
    `;
    return NextResponse.json({
      status: "ok",
      message: "Connected to database successfully",
      serverTime: result[0].now,
    });
  } catch (error: unknown) {
    console.error("DB connection error:", error);
    if (error instanceof Error)
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to database",
          error: error.message,
        },
        { status: 500 }
      );
  }
}
