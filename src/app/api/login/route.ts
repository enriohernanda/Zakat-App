import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return Response.json(
      { error: 'User not found' },

      { status: 404 },
    );
  }

  const valid = await bcrypt.compare(body.password, user.password);

  if (!valid) {
    return Response.json(
      { error: 'Wrong password' },

      { status: 401 },
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },

    'SECRET',

    {
      expiresIn: '7d',
    },
  );

  return Response.json({
    token,
    userId: user.id,
  });
}
