import { NextRequest, NextResponse } from 'next/server';
import { AdminLoginSchema } from '@/lib/validators';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit';
import {
  createAdminToken,
  verifyAdminCredentials,
  isValidAdminUsername,
  getExpectedAdminUsername,
  JWT_COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    // In-memory rate limiting: 15 attempts per 15 min per IP
    const rateCheck = checkRateLimit(`login_${ip}`, 15, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please try again after ${Math.ceil(
            rateCheck.retryAfterSeconds / 60
          )} minutes.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = AdminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid login payload. Username and password are required.' },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;

    const isUsernameMatch = isValidAdminUsername(username);
    const isPasswordValid = await verifyAdminCredentials(password);

    if (!isUsernameMatch || !isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Reset rate limit upon successful login
    resetRateLimit(`login_${ip}`);

    const token = await createAdminToken(username);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
    });

    response.cookies.set({
      name: JWT_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred' },
      { status: 500 }
    );
  }
}
