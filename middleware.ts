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
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
