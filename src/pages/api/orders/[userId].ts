import type { NextApiRequest, NextApiResponse } from "next";
import { OrderHistory } from "@/interfaces";
import { prisma } from "@/server";
import { validations } from "@/utils";

type Data =
  | {
      message: string;
    }
  | OrderHistory[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUserOrders(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getUserOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId = "" } = req.query;

  if (typeof userId !== "string") {
    return res.status(400).json({ message: "Bad request" });
  }

  if (!validations.isUUID(userId)) {
    return res.status(400).json({ message: "Invalid uuid" });
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      isPaid: true,
      shippingAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const ordersHistory: OrderHistory[] = orders.map((order) => ({
    id: order.id,
    paid: order.isPaid,
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
  }));

  return res.status(200).json(ordersHistory);
}
