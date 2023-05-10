import type { NextApiRequest, NextApiResponse } from "next";
import { seedDatabase } from "@/database";
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
    await prisma.$transaction(async (db) => {
      await db.user.deleteMany();
      await db.productSize.deleteMany();
      await db.tag.deleteMany();
      await db.image.deleteMany();
      await db.product.deleteMany();

      await db.user.createMany({
        data: seedDatabase.initialData.users.map((user) => ({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        })),
      });
    });

    for (const product of seedDatabase.initialData.products) {
      await prisma.product.create({
        data: {
          title: product.title,
          description: product.description,
          gender: product.gender,
          slug: product.slug,
          price: product.price,
          type: product.type,
          inStock: product.inStock,
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
