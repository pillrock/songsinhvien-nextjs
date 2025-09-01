import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
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
    return handleError(error, "Failed to connect to database", 500004);
  }
}
