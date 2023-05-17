import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/server";
import { CompleteOrder, OrderBody } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | CompleteOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body as OrderBody;
  const { orderItems, total } = body;

  // Verify if there is an authenticated user
  const session: any = await getServerSession(req, res, authOptions);

  if (!session)
    return res.status(401).json({ message: "Must be authenticated" });

  // Create an array with the products that the person wants
  const productsIds = orderItems.map((product) => product.productId);

  const dbProducts = await prisma.product.findMany({
    where: {
      id: { in: productsIds },
    },
    include: { images: true },
  });

  try {
    /* Check total */
    const subTotal = orderItems.reduce((prev, current) => {
      const productPrice = dbProducts.find(
        (prod) => prod.id === current.productId
      )!.price;

      if (!productPrice)
        throw new Error("Check the cart again, product does not exist");

      return current.quantity * productPrice + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal)
      throw new Error("The total is not the same on the server");

    // All Good
    const userId = session.user.id;

    const newOrder = await prisma.order.create({
      data: {
        ...body,
        isPaid: false,
        orderItems: {
          createMany: { data: orderItems },
        },
        shippingAddress: {
          create: { ...body.shippingAddress },
        },
        user: { connect: { id: userId } },
      },
      include: {
        shippingAddress: true,
        orderItems: true,
      },
    });

    return res.status(201).json(newOrder);
  } catch (error: any) {
    console.log(error);

    return res
      .status(400)
      .json({ message: error.message || "Problem with the data" });
  }
}
