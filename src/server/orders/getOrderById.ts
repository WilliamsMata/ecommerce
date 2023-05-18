import { CompleteOrder } from "@/interfaces";
import { prisma } from "../db";
import { validations } from "@/utils";

export const getOrderById = async (
  id: string
): Promise<CompleteOrder | null> => {
  if (!validations.isUUID(id)) return null;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
      shippingAddress: true,
    },
  });

  if (!order) return null;

  return JSON.parse(JSON.stringify(order));
};
