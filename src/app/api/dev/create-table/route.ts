import { conn } from "@/lib/db";
import { NextResponse } from "next/server";
import query from "@/lib/db-schema";
export async function GET() {
  try {
    const result = await conn.unsafe(query);
    return NextResponse.json({
      status: "ok",
      message: "Tables created successfully",
      result,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          status: "error",
          message: `Failed to create table: ${error.message}`,
        },
        { status: 500 }
      );
  }
}
