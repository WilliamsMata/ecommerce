import type { NextApiRequest, NextApiResponse } from "next";
import { Gender } from "@prisma/client";
import { prisma } from "@/server";
import { SHOP_CONSTANT } from "@/database";
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
      return getProducts(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { gender } = req.query;

  let genderToFind: Gender | undefined = undefined;

  // verificamos si el gender se incluye en los géneros validos
  if (
    gender !== undefined &&
    SHOP_CONSTANT.validGenders.includes(gender as Gender)
  ) {
    genderToFind = gender as Gender;
  }

  const products = await prisma.product.findMany({
    where: {
      gender: genderToFind,
    },

    select: {
      title: true,
      price: true,
      images: { select: { url: true } },
      inStock: true,
      slug: true,
    },

    orderBy: {
      gender: "asc",
    },
  });

  return res.status(200).json(products);
}
