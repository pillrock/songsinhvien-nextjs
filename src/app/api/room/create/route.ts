import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/backend/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

// create a new room by name
export async function POST(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { roomName } = await req.json();
      const { userId } = dataUser!;
      console.log("userID: ", userId, typeof userId);

      // validate length roomName
      if (roomName.length > 12) {
        return NextResponse.json(
          {
            status: "error",
            message: "Room name is too long",
          },
          { status: 400 }
        );
      }

      // create new room
      const result = await conn`INSERT INTO rooms (name, owner_id)
            VALUES(${roomName},${userId}) RETURNING *`;
      const newRoom = result[0];
      console.log("userId:", userId, typeof userId);

      // insert room_id for User
      const userResult =
        await conn`UPDATE users SET room_id = ${newRoom.room_id} WHERE user_id = ${userId} RETURNING *`;
      console.log(userResult);

      return NextResponse.json({
        status: "ok",
        message: `room created by name: ${roomName}`,
        data: newRoom,
      });
    });
  } catch (error) {
    return handleError(error, "Failed to create room", 500007);
  }
}
