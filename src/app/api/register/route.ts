import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password required' },

        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },

        { status: 400 },
      );
    }

    const hash = await bcrypt.hash(
      body.password,

      10,
    );

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hash,
      },
    });

    return NextResponse.json({
      message: 'User created',
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: 'Register failed' },

      { status: 500 },
    );
  }
}
