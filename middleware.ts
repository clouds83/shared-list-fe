<<<<<<< HEAD
import { NextResponse, NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const token = request.cookies.get('token');

  if ((!token && !isPublicPath) || pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublicPath) {
=======
import { NextResponse, type NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_session')?.value;
  const noToken = !token;
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = !isPublicRoute;
  const isRootPath = pathname === '/';

  if (noToken && (isPrivateRoute || isRootPath)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (isPublicRoute || isRootPath)) {
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
<<<<<<< HEAD
  matcher: ['/((?!_next|favicon.ico|public).*)'],
=======
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
};
