import { NextResponse } from "next/server";
export function handleError(error: unknown, message: string, idError: number) {
  if (error instanceof Error) {
    return NextResponse.json(
      {
        status: "error",
        message: `${message}: ${error.message}`,
      },
      { status: 500 }
    );
  }
  console.log(`[#${idError}] Error undefined: ${error}`);
  return NextResponse.json({
    status: "error",
    message: `[#${idError}] Error undefined: `,
    idError,
  });
}
