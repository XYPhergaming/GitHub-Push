import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public paths
  const isPublicPath = pathname === '/';

  // Get the session token from cookies (Firebase sets a session cookie by default)
  // For simplicity, we check if the request has an auth token in cookies.
  // In a real app, you'd validate the session server-side.
  const session = request.cookies.get('__session')?.value;

  // If trying to access protected route without session, redirect to home
  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If logged in and on home page, redirect to chat
  if (isPublicPath && session) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/chat/:path*', '/profile/:path*'],
};