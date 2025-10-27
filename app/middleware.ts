import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/app')) {
    // Check for auth token/session (you'll need to implement this based on your auth setup)
    const authToken = request.cookies.get('__session')?.value;
    
    if (!authToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/app/:path*',
};
