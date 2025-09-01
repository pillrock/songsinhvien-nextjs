import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { NextRequest, NextResponse } from "next/server";

const isAllNumber = (str: string): boolean => {
  return /^\d+$/.test(str);
};

// get data room by id
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const params = await context.params;
    const roomId = params.id;
    if (!isAllNumber(roomId)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid room ID",
        },
        { status: 400 }
      );
    }
    const result = await conn`
    SELECT user_id, username FROM users
      INNER JOIN rooms ON users.room_id = rooms.room_id
      WHERE rooms.room_id = ${roomId}
    `;

    if (result.length == 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Room not found or NoBody in this room",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      status: "ok",
      message: `success`,
      data: result,
    });
  } catch (error) {
    return handleError(error, "failed to get users in room", 500009);
  }
}
