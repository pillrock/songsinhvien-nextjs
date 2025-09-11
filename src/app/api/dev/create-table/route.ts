import { conn } from "@/lib/db";
import { NextResponse } from "next/server";
import query from "@/lib/db-schema";
import { handleError } from "@/lib/utils/api/handleError";
export async function GET() {
  try {
    const result = await conn.unsafe(query);
    return NextResponse.json({
      status: "ok",
      message: "Tables created successfully",
      result,
    });
  } catch (error: unknown) {
    return handleError(error, "Failed to create table", 500003);
  }
}
