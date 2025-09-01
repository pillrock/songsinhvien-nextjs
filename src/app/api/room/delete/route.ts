import { conn } from "@/lib/db";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { roomId } = await req.json();

      // check valid
      if (!roomId) {
        return NextResponse.json(
          { status: "error", message: "roomId is required" },
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
      if (room[0].owner_id !== dataUser?.userId) {
        return NextResponse.json(
          { status: "error", message: "Only owner can delete room" },
          { status: 403 }
        );
      }
      const result =
        await conn`DELETE FROM rooms WHERE room_id = ${roomId} RETURNING *`;

      return NextResponse.json({
        status: "ok",
        message: `delete room success`,
        data: result[0],
      });
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to delete room" + error?.message,
        },
        { status: 500 }
      );
  }
}
