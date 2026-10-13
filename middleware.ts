import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_COOKIE_NAME = 'kanani_admin_token';

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET || 'kanani_industries_jwt_secret_key_production_2026_super_secure_random_string_32chars';
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
    const isAdminApiRoute = pathname.startsWith('/api/admin') && pathname !== '/api/admin/login';
    const isLoginPage = pathname === '/admin/login';

    const tokenCookie = request.cookies.get(JWT_COOKIE_NAME);
    const token = tokenCookie?.value;

    let isValidAdmin = false;
    if (token) {
      try {
        const secret = getJwtSecretKey();
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
        if (payload.role === 'admin') {
          isValidAdmin = true;
        }
      } catch {
        isValidAdmin = false;
      }
    }

    // Redirect to dashboard if logged-in user hits /admin/login
    if (isLoginPage && isValidAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Protect Admin Pages
    if (isAdminRoute && !isValidAdmin) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (tokenCookie) {
        response.cookies.delete(JWT_COOKIE_NAME);
      }
      return response;
    }

    // Protect Admin API routes
    if (isAdminApiRoute && !isValidAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to access admin operations.' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ middlewareError: String(err) }, { status: 500 });
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
