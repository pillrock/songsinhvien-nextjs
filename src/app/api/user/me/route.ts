import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/api/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      return NextResponse.json({
        status: "ok",
        message: `get dataUser successfully`,
        data: dataUser,
      });
    });
  } catch (error) {
    return handleError(error, "Failed to get room data", 500230);
  }
}
