import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/api/handleError";
import { verifyToken } from "@/lib/utils/api/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export interface DataUser {
  userId: number;
  roomId: number;
  name: string;
  passwordHash: string;
  username: string;
}

/**
 *- CHECK user must be exists in DB
 *- CHECK by access token -> userID -> check DB

 @param req: NextRequest
 @param callback: Function to handle dataUser (new data is returned from DATABASE)

 @returns NextResponse
 */
export async function withCheckAlive(
  req: NextRequest,
  callback: (dataUser?: DataUser) => Promise<NextResponse>
) {
  try {
    const access_token = req.headers
      .get("Authorization")
      ?.replace("Bearer ", "");
    const decode = await verifyToken(access_token as string);
    const dataUser = decode?.payload;
    if (!dataUser) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }
    const userId = dataUser?.user_id as number;

    const result = await conn`SELECT * FROM users WHERE user_id = ${userId}`;
    if (result.length === 0) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }
    return callback({
      userId: result[0].user_id,
      roomId: result[0].room_id,
      name: result[0].name,
      username: result[0].username,
      passwordHash: result[0].password_hash,
    } as DataUser);
  } catch (error) {
    return handleError(error, "check alive error", 500020);
  }
}
