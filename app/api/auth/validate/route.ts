import { NextResponse } from "next/server";
import { getTokens } from "next-firebase-auth-edge";
  import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  try {
    const tokens = await getTokens(cookieStore, {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      cookieName: "__session",
      cookieSignatureKeys: [
        process.env.COOKIE_SECRET_CURRENT!,
        process.env.COOKIE_SECRET_PREVIOUS!,
      ],
      serviceAccount: {
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!,
      },
    });
    if (!tokens) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
    return NextResponse.json({ valid: true, tokens });
  } catch (err) {
    return NextResponse.json({ valid: false, error: String(err) }, { status: 401 });
  }
}
