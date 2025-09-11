import { conn } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils/api/generateToken";
import { handleError } from "@/lib/utils/api/handleError";
export async function POST(res: NextRequest) {
  try {
    const { username, password } = await res.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          status: "error",
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }
    // validate username
    const isUserExist = await conn`
        SELECT user_id FROM users WHERE username = ${username}`;
    if (isUserExist.length > 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Username already exists",
        },
        { status: 400 }
      );
    }

    // hash password
    const password_hash = await bcrypt.hash(password, 8);

    const newUser = await conn`
        INSERT INTO users (username, password_hash)
        VALUES (${username}, ${password_hash})
        RETURNING *`;

    // generate token
    const access_token = await generateToken(newUser[0]);
    console.log("access_token", access_token);

    return NextResponse.json({
      status: "ok",
      message: "Signup success",
      data: {
        ...newUser[0],
        access_token,
        password_hash: "password_encrypted",
      },
    });
  } catch (error: unknown) {
    return handleError(error, "SignUp error", 500002);
  }
}
