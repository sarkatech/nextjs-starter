import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { serialize } from "cookie";

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );

    const token = await userCredential.user.getIdToken();
    
    const cookie = serialize("__session", token);

    return NextResponse.json({ success: true }, { headers: { "Set-Cookie": cookie } });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
