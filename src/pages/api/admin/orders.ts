import { prisma } from "@/server";
import type { NextApiRequest, NextApiResponse } from "next";
import type { OrderWithUser } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | OrderWithUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrders(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return res.status(200).json(orders);
}
