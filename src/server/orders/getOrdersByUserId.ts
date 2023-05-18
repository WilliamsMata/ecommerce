import { prisma } from "../db";
import { validations } from "@/utils";
import { OrderHistory } from "@/interfaces";

export const getOrdersByUserId = async (
  userId: string
): Promise<OrderHistory[]> => {
  if (!validations.isUUID(userId)) {
    return [];
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

  return ordersHistory;
};
