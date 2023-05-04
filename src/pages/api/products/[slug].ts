import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import { prisma } from "@/server";

type Data =
  | {
      message: string;
    }
  | Product;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getProductBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const slug = typeof req.query.slug === "string" ? req.query.slug : undefined;

  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },

      include: {
        images: { select: { url: true } },
        sizes: { select: { size: true } },
        tags: { select: { name: true } },
      },
    });

    if (!product) {
      return res.status(404).json({
        message: `Product with slug: ${slug} not found`,
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Please talk to the admin",
    });
  }
}
