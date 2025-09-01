import { handleError } from "@/lib/utils/handleError";
import { verifyToken } from "@/lib/utils/verifyToken";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export const withAuth = async (req: NextRequest) => {
  try {
    const access_token = req.headers
      .get("Authorization")
      ?.replace("Bearer ", "");
    if (!access_token) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }
    if (access_token == "{{token}}") {
      return NextResponse.json(
        { status: "error", message: "Invalid access_token" },
        { status: 403 }
      );
    }
    const decode = await verifyToken(access_token);
    const dataUser = decode?.payload;

    // check status user
    if (!dataUser) {
      return NextResponse.json(
        { status: "error", message: "Invalid access_token" },
        { status: 403 }
      );
    }
    console.log("Token Valid");

    console.log("Access Token:", access_token);
    return NextResponse.next();
  } catch (error: unknown) {
    return handleError(error, "Error Verifying token", 500019);
  }
};
