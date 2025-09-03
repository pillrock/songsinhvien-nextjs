import { DataUser } from "@/middleware/checkAlive";
import { jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const verifyToken = async (token: string) => {
  try {
    const payload = await jwtVerify<DataUser>(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    if (error instanceof Error)
      console.log("Token verification failed:", error?.message);
    return null;
  }
};
