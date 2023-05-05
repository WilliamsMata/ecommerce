import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server";
import { GetProducts } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | GetProducts[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { q = "" } = req.query;

  if (q.length === 0) {
    return res.status(400).json({
      message: "You must specify the search query",
    });
  }

  q = q.toString().toLowerCase();

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { tags: { some: { name: { contains: q } } } },
        ],
      },

      select: {
        title: true,
        price: true,
        inStock: true,
        slug: true,
        images: { select: { url: true } },
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Please talk to the admin",
    });
  }
}
