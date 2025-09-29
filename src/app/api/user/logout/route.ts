import { handleError } from "@/lib/utils/api/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const cookieStore = await cookies();
      cookieStore.delete("auth-token");
      cookieStore.set("isLogin", "-1");
      return NextResponse.json({
        status: "ok",
        message: `logout successfully`,
        data: { ...dataUser, passwordHash: null },
      });
    });
  } catch (error) {
    return handleError(error, "Failed to get room data", 500230);
  }
}
