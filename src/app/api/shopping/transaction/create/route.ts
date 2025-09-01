import { conn } from "@/lib/db";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { price, note } = await req.json();
      const { userId, roomId } = dataUser!;
      console.log("userID: ", userId, typeof userId);

      // validate roomId
      if (!roomId) {
        return NextResponse.json(
          {
            status: "error",
            message: "Cannot find your room, cannot create transaction",
          },
          { status: 400 }
        );
      }
      // validate data in transaction
      if (
        !price ||
        !note ||
        typeof price !== "number" ||
        price < 0 ||
        typeof note !== "string" ||
        note.length > 255
      ) {
        return NextResponse.json(
          {
            status: "error",
            message: "Invalid value input. price: int, note: string<255>",
          },
          { status: 400 }
        );
      }

      // create new transaction
      const result =
        await conn`INSERT INTO transactions (room_id, user_id, price, note)
            VALUES(${roomId}, ${userId}, ${price}, ${note}) RETURNING *`;
      const newTransaction = result[0];

      return NextResponse.json({
        status: "ok",
        message: `transaction created by user: ${userId} successfully`,
        data: newTransaction,
      });
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to create transaction" + error?.message,
        },
        { status: 500 }
      );
  }
}
