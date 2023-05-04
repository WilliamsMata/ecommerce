import type { NextApiRequest, NextApiResponse } from "next";
import { GetProductBySlug } from "@/interfaces";
import { getProductBySlug } from "@/server/products";

type Data =
  | {
      message: string;
    }
  | GetProductBySlug;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const slug = typeof req.query.slug === "string" ? req.query.slug : undefined;

  try {
    const product = await getProductBySlug(slug || "");

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
