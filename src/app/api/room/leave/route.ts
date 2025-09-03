import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/backend/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { roomId } = await req.json();

      console.log(dataUser);

      const { userId } = dataUser!;

      // check room exist
      const roomExist =
        await conn`SELECT * FROM rooms WHERE room_id = ${roomId}`;
      if (roomExist.length == 0) {
        return NextResponse.json(
          {
            status: "error",
            message: `Room not found`,
          },
          { status: 404 }
        );
      }

      // check user is already in room
      if (roomId != dataUser?.roomId) {
        return NextResponse.json(
          {
            status: "error",
            message: `User isn't already in room ${roomId}`,
          },
          { status: 400 }
        );
      }

      // insert room_id for User
      const result =
        await conn`UPDATE users SET room_id = NULL WHERE user_id = ${userId} RETURNING *`;
      return NextResponse.json({
        status: "ok",
        message: `leave the room id ${roomId} successfully`,
        data: result[0],
      });
    });
  } catch (error) {
    return handleError(error, "Failed to leave room", 500011);
  }
}
