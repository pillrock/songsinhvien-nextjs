import { conn } from "@/lib/db";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return await withCheckAlive(req, async () => {
      const result = await conn`
            SELECT * FROM transactions
        `;
      return NextResponse.json(
        {
          status: "ok",
          message: "Successfully get all transactions",
          data: result,
        },
        { status: 200 }
      );
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to get all transactions" + error?.message,
          error,
        },
        { status: 500 }
      );
  }
}
