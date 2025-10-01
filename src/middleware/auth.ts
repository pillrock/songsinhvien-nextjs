import { handleError } from "@/lib/utils/api/handleError";
import { verifyToken } from "@/lib/utils/api/verifyToken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export const withAuth = async (req: NextRequest) => {
  try {
    const header = new Headers(req.headers);
    const cookiesStore = await cookies();
    const access_token = cookiesStore.get("auth-token")?.value;

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

    header.set("x-user-data", JSON.stringify(dataUser));

    return NextResponse.next({
      request: {
        headers: header,
      },
    });
  } catch (error: unknown) {
    return handleError(error, "Error Verifying token", 500019);
  }
};
