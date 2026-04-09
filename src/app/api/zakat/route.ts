import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

function getUserId(req: Request) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  try {
    const data: any = jwt.verify(token, 'SECRET');

    return data.userId;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const userId = getUserId(req);

  if (!userId) {
    return Response.json(
      { error: 'Unauthorized' },

      { status: 401 },
    );
  }

  const body = await req.json();

  const data = await prisma.zakat.create({
    data: {
      type: body.type,

      assets: body.assets || 0,

      savings: body.savings || 0,

      debt: body.debt || 0,

      income: body.income || 0,

      result: body.result,

      userId,
    },
  });

  return Response.json(data);
}

export async function GET(req: Request) {
  const userId = getUserId(req);

  if (!userId) {
    return Response.json(
      { error: 'Unauthorized' },

      { status: 401 },
    );
  }

  const data = await prisma.zakat.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: 'desc',
    },
  });

  const total = data.reduce(
    (a, b) => a + b.result,

    0,
  );

  const transactions = data.length;

  const avg = transactions ? total / transactions : 0;

  const thisMonth = data
    .filter((item) => {
      const d = new Date(item.createdAt);

      const now = new Date();

      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((a, b) => a + b.result, 0);

  return Response.json({
    history: data,

    stats: {
      total,

      transactions,

      avg,

      thisMonth,
    },
  });
}

export async function DELETE(req: Request) {
  const userId = getUserId(req);

  if (!userId) {
    return Response.json(
      { error: 'Unauthorized' },

      { status: 401 },
    );
  }

  const body = await req.json();

  await prisma.zakat.deleteMany({
    where: {
      id: body.id,

      userId,
    },
  });

  return Response.json({
    message: 'Deleted',
  });
}
