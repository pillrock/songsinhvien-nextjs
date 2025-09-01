import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { NextRequest, NextResponse } from "next/server";

export const isAllNumber = (str: string): boolean => {
  return /^\d+$/.test(str);
};

// get data room by id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
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
    const result = await conn`SELECT * FROM rooms WHERE room_id = ${roomId}`;
    if (result.length == 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Room not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      status: "ok",
      message: `get room data successfully`,
      data: result[0],
    });
  } catch (error) {
    return handleError(error, "Failed to get room data", 500006);
  }
}
