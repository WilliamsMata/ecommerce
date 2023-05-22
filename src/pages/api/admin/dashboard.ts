import type { NextApiRequest, NextApiResponse } from "next";
import { DashboardData } from "@/interfaces";
import { prisma } from "@/server";

type Data = DashboardData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { isPaid: true } }),
    prisma.user.count({ where: { role: "client" } }),
    prisma.product.count(),
    prisma.product.count({ where: { inStock: 0 } }),
    prisma.product.count({ where: { inStock: { lte: 10 } } }),
  ]);

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
