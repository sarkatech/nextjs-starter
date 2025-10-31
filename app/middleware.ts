import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rutas públicas
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/")
  ) {
    return NextResponse.next();
  }

  // Solo verifica si existe la cookie __session
  const sessionCookie = request.cookies.get("__session");
  if (!sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Si existe la cookie, continúa normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login|favicon.ico).*)"],
};
