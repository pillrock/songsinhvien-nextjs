import { conn } from "@/lib/db";
import { withCheckAlive } from "@/middleware/checkAlive";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { transactionId } = await req.json();
      const { userId } = dataUser!;

      // check valid
      if (
        !transactionId ||
        typeof transactionId !== "number" ||
        transactionId <= 0
      ) {
        return NextResponse.json(
          { status: "error", message: "invalid transactionId: int, required" },
          { status: 400 }
        );
      }

      const room =
        await conn`SELECT user_id FROM transactions WHERE tran_id = ${transactionId}`;
      // return transaction not found
      if (room.length == 0) {
        return NextResponse.json(
          { status: "error", message: "the transaction not found" },
          { status: 404 }
        );
      }
      if (room[0].user_id !== userId) {
        return NextResponse.json(
          {
            status: "error",
            message: "Only creator can delete the transaction",
          },
          { status: 403 }
        );
      }
      const result =
        await conn`DELETE FROM transactions WHERE tran_id = ${transactionId} RETURNING *`;

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
          message: "Failed to delete transaction" + error?.message,
        },
        { status: 500 }
      );
  }
}
