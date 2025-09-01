import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

// get data room by id
export async function GET(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { userId, roomId } = dataUser!;
      console.log(userId);

      if (roomId === null) {
        return NextResponse.json(
          {
            status: "error",
            message: "user has not joined a room yet",
          },
          { status: 400 }
        );
      }

      const result = await conn`
        SELECT r.room_id, r.name, r.create_at FROM rooms AS r 
        LEFT JOIN users AS u ON u.room_id = r.room_id
        WHERE u.user_id = ${userId}
        `;
      console.log(result);

      if (result.length == 0) {
        return NextResponse.json(
          {
            status: "error",
            message: "Room not found",
            data: result,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        status: "ok",
        message: `get room data successfully`,
        data: result[0],
      });
    });
  } catch (error) {
    return handleError(error, "Failed to get room data", 500012);
  }
}
