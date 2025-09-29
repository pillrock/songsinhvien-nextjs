import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "./middleware/auth";
import { rateLimit } from "./lib/rate-limit";
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const identifier = `${req.headers.get("x-forwarded-for")}-${req.headers.get(
    "user-agent"
  )}`;
  const endPointsNotAuth = ["/signin", "/signup", "/ping"];

  // rate limit APIx
  const { success } = await rateLimit.limit(identifier);
  if (!success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Too many requests. Please try again later.",
      },
      { status: 429 }
    );
  }

  // handle api for development
  if (pathname.startsWith("/api/dev/")) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "API is only available in development environment",
        },
        { status: 405 }
      );
    }
  }

  // using auth for all API '/api/*' endpoints except for endpoints in the endPointsNotAuth list
  if (
    pathname.startsWith("/api/") &&
    !endPointsNotAuth.includes(pathname.split("/api")[1])
  ) {
    return await withAuth(req);
  }

  //handle for route page need auth
  if (req.method == "GET") {
    const access_token = req.headers
      .get("Authorization")
      ?.replace("Bearer ", "");
    if (!access_token) return;
  }
}

export const config = {
  matcher: [
    /*
     * Khớp với tất cả các đường dẫn request ngoại trừ những đường dẫn bắt đầu bằng:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (trang chủ)
     * - /login, /signup (các trang public)
     */
    "/((?!_next/static|_next/image|favicon.ico|login|signup|$).*)",
  ],
};
