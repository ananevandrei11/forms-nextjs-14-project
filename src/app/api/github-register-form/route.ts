import { UserSchema } from "@/_schemas/user-schena";
import { convertZodErrors } from "@/_utils/erorrs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const result = UserSchema.safeParse(body);

  if (result.success) {
    return NextResponse.json({ success: true });
  }

  const serverErrors = convertZodErrors(result.error);

  return NextResponse.json({ errors: serverErrors });
}