import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server";
import type { CompleteProduct } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | CompleteProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "PUT":
      return;

    case "POST":
      return;

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const products = await prisma.product.findMany({
    orderBy: { title: "asc" },

    include: {
      images: {
        orderBy: { order: "asc" },
      },
      sizes: true,
      tags: true,
    },
  });

  // Todo:
  // Tendremos que actualizar las imágenes

  return res.status(200).json(products);
}
