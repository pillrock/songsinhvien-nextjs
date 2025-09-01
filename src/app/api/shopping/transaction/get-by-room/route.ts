import { conn } from "@/lib/db";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      if (!dataUser)
        return NextResponse.json(
          {
            status: "error",
            message: "Failed to dataUser from withCheckAlive",
          },
          { status: 401 }
        );
      const { roomId } = dataUser;
      const result = await conn`
            SELECT * FROM transactions
            WHERE room_id = ${roomId}
            ORDER BY create_at DESC;
        `;
      return NextResponse.json(
        {
          status: "ok",
          message: "Successfully get transactions by room",
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
