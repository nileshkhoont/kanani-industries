import fs from 'fs';
import path from 'path';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_COOKIE_NAME = 'kanani_admin_token';

/**
 * Reads an environment variable prioritizing .env.local on disk
 * so that credential updates work immediately without having to restart the dev server.
 */
function getLoadedEnvValue(key: string): string | null {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const regex = new RegExp(`^${key}=["']?([^"'\r\n]+)["']?`, 'm');
      const match = content.match(regex);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch {
    // Ignore file read issues and fall through
  }

  if (process.env[key]) {
    return process.env[key]!.trim();
  }
  return null;
}

function getJwtSecretKey(): Uint8Array {
  const secret = getLoadedEnvValue('JWT_SECRET');
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long in environment variables');
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminToken(username: string): Promise<string> {
  const secret = getJwtSecretKey();
  return new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<{ username: string; role: string } | null> {
  try {
    const secret = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
    if (payload.role === 'admin' && typeof payload.username === 'string') {
      return { username: payload.username, role: payload.role as string };
    }
    return null;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(password: string): Promise<boolean> {
  const hashesToTest = new Set<string>();

  // 1. Read live .env.local on disk first (handles edits without requiring a server restart)
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^ADMIN_PASSWORD_HASH=["']?([^"'\r\n]+)["']?/m);
      if (match && match[1]) {
        hashesToTest.add(match[1].trim());
      }
    }
  } catch {}

  // 2. Also check running process.env as fallback
  if (process.env.ADMIN_PASSWORD_HASH) {
    hashesToTest.add(process.env.ADMIN_PASSWORD_HASH.trim());
  }

  if (hashesToTest.size === 0) {
    console.error('CRITICAL: ADMIN_PASSWORD_HASH is not set in environment or .env.local');
    return false;
  }

  for (const hash of hashesToTest) {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      if (isMatch) return true;
    } catch {
      // Continue to next candidate hash
    }
  }

  return false;
}

export function isValidAdminUsername(username: string): boolean {
  if (!username) return false;
  const input = username.trim().toLowerCase();
  const configured = (getLoadedEnvValue('ADMIN_USERNAME') || 'admin').trim().toLowerCase();
  return (
    input === configured ||
    input === 'admin' ||
    input === 'admin@kananiindustries.com'
  );
}

export function getExpectedAdminUsername(): string {
  return getLoadedEnvValue('ADMIN_USERNAME') || 'admin';
}

export { JWT_COOKIE_NAME };
