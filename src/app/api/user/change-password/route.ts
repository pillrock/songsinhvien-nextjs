import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { withCheckAlive } from "@/middleware/checkAlive";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    return await withCheckAlive(req, async (dataUser) => {
      const { currentPassword, newPassword } = await req.json();
      const { passwordHash, userId } = dataUser!;
      console.log("currentPassword", currentPassword);

      if (
        !newPassword ||
        !currentPassword ||
        typeof newPassword !== "string" ||
        typeof currentPassword !== "string"
      ) {
        return NextResponse.json(
          {
            status: "error",
            message:
              "currentPassword: STRING and newPassword: STRING field in PAYLOAD(json) is required",
          },
          { status: 400 }
        );
      }
      if (currentPassword === newPassword) {
        return NextResponse.json(
          {
            status: "error",
            message: "New password cannot be the same as current password",
          },
          { status: 400 }
        );
      }
      const isVerified = await bcrypt.compare(currentPassword, passwordHash);
      if (!isVerified) {
        return NextResponse.json(
          {
            status: "error",
            message: "Invalid current password",
          },
          { status: 400 }
        );
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      await conn`
        UPDATE users
        SET password_hash = ${newPasswordHash}
        WHERE user_id = ${userId}`;
      return NextResponse.json({
        status: "ok",
        message: "Password changed successfully",
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name == "SyntaxError") {
        return NextResponse.json(
          {
            status: "error",
            message:
              "currentPassword: STRING and newPassword: STRING field in PAYLOAD(json) is required",
          },
          { status: 400 }
        );
      }
    }
    return handleError(error, "Failed to change password", 500018);
  }
}
