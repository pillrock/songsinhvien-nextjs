import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

// update a room by id
export async function PUT(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { roomName, roomId } = await req.json();

      // check valid
      if (!roomId || !roomName) {
        return NextResponse.json(
          { status: "error", message: "roomId and roomName is required" },
          { status: 400 }
        );
      }
      if (roomName.length > 12) {
        return NextResponse.json(
          {
            status: "error",
            message: "Room name should not exceed 12 characters",
          },
          { status: 400 }
        );
      }
      const room =
        await conn`SELECT owner_id FROM rooms WHERE room_id = ${roomId}`;

      // return room not found
      if (room.length == 0) {
        return NextResponse.json(
          { status: "error", message: "Room not found" },
          { status: 404 }
        );
      }
      if (room[0].owner_id != dataUser!.userId) {
        return NextResponse.json(
          {
            status: "error",
            message: "Only owner can update room",
          },
          { status: 403 }
        );
      }
      const result =
        await conn`UPDATE rooms SET name = ${roomName} WHERE room_id = ${roomId} RETURNING *`;

      console.log(result);

      return NextResponse.json({
        status: "ok",
        message: `update room success`,
        data: result[0],
      });
    });
  } catch (error) {
    return handleError(error, "Failed to update room", 500013);
  }
}
