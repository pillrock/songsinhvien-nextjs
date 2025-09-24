import { conn } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils/api/generateToken";
import { handleError } from "@/lib/utils/api/handleError";
export async function POST(res: NextRequest) {
  try {
    const { username, password } = await res.json();
    console.log(username, password);

    if (!username || !password) {
      return NextResponse.json(
        {
          status: "error",
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }
    const isUserExist = await conn`
        SELECT * FROM users WHERE username = ${username}`;
    if (isUserExist.length === 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid username or password",
        },
        { status: 400 }
      );
    }
    console.log(isUserExist[0]);

    // check password
    const isValidPassword = await bcrypt.compare(
      password,
      isUserExist[0].password_hash
    );
    if (!isValidPassword) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid username or password",
        },
        { status: 400 }
      );
    }
    // generate token
    const access_token = await generateToken(isUserExist[0]);
    return NextResponse.json({
      status: "ok",
      message: "Signin success",
      data: {
        ...isUserExist[0],
        password_hash: "password_encrypted",
        access_token,
      },
    });
  } catch (error: unknown) {
    return handleError(error, "Signin error", 500001);
  }
}
