import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("__session", "");

  return NextResponse.json({ success: true }, { headers: { "Set-Cookie": cookie } });
}
