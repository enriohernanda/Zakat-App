import jwt from 'jsonwebtoken';

const JWT_SECRET = 'SUPER_SECRET_KEY';

export function signToken(userId: string) {
  return jwt.sign(
    { userId },

    JWT_SECRET,

    { expiresIn: '7d' },
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };
  } catch {
    return null;
  }
}
