import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/backend/handleError";
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
    return handleError(error, "Failed to get all transactions", 500016);
  }
}
