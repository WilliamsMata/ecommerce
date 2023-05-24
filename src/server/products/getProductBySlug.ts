import { prisma } from "../db";
import type { CompleteProduct } from "@/interfaces";

export const getProductBySlug = async (
  slug: string
): Promise<CompleteProduct | null> => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },

    include: {
      images: true,
      sizes: true,
      tags: true,
    },
  });

  return JSON.parse(JSON.stringify(product));
};
