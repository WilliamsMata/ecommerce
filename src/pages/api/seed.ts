import type { NextApiRequest, NextApiResponse } from "next";
import { initialData } from "@/database";
import { prisma } from "@/server";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "You don't have access to this api" });
  }

  try {
    await prisma.productSize.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.image.deleteMany();
    await prisma.product.deleteMany();

    for (const product of initialData.products) {
      await prisma.product.create({
        data: {
          title: product.title,
          description: product.description,
          gender: product.gender,
          slug: product.slug,
          price: product.price,
          type: product.type,
          images: {
            create: product.images.map((image, i) => ({
              url: image,
              order: i,
            })),
          },
          tags: {
            connectOrCreate: product.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
          sizes: {
            connectOrCreate: product.sizes.map((size) => ({
              where: { size },
              create: { size },
            })),
          },
        },
      });
    }

    res.status(200).json({ message: "Proceso realizado correctamente" });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({ message: error });
  }
}
