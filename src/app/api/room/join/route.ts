import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { roomId } = await req.json();
      const { userId } = dataUser!;

      if (dataUser!.roomId == roomId) {
        return NextResponse.json(
          {
            status: "ok",
            message: `You are already in room id ${roomId}`,
          },
          { status: 200 }
        );
      }
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

      // insert room_id for User

      await conn`UPDATE users SET room_id = ${roomId} WHERE user_id = ${userId} RETURNING *`;
      return NextResponse.json({
        status: "ok",
        message: `join the room id ${roomId} successfully`,
        data: roomExist[0],
      });
    });
  } catch (error) {
    return handleError(error, "failed to join room", 500010);
  }
}
