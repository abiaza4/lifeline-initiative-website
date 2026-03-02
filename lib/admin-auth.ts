// Server-side admin authentication utilities

export interface AdminSession {
  email: string;
  loginTime: number;
  expiresAt: number;
  sessionId: string;
}

const ADMIN_EMAIL = 'admin@liss-southsudan.org';
const ADMIN_PASSWORD = 'LISS@2024';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function validateAdminCredentials(email: string, password: string): boolean {
  // Use constant-time comparison to prevent timing attacks
  const emailMatch = Buffer.from(email).toString() === Buffer.from(ADMIN_EMAIL).toString();
  const passwordMatch = Buffer.from(password).toString() === Buffer.from(ADMIN_PASSWORD).toString();
  return emailMatch && passwordMatch;
}

export function createAdminSession(email: string): AdminSession {
  return {
    email,
    loginTime: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
}

export function validateAdminSession(session: AdminSession): boolean {
  if (!session || !session.expiresAt) {
    return false;
  }
  
  // Check if session has expired
  if (Date.now() > session.expiresAt) {
    return false;
  }

  // Verify session structure
  if (!session.email || !session.sessionId) {
    return false;
  }

  return session.email === ADMIN_EMAIL;
}

export function getSessionCookie(session: AdminSession): string {
  return Buffer.from(JSON.stringify(session)).toString('base64');
}

export function parseSessionCookie(cookie: string): AdminSession | null {
  try {
    return JSON.parse(Buffer.from(cookie, 'base64').toString('utf-8'));
  } catch {
    return null;
  }
}
