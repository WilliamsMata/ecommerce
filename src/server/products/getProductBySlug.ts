import { GetProductBySlug } from "@/interfaces";
import { prisma } from "../db";

export const getProductBySlug = async (
  slug: string
): Promise<GetProductBySlug | null> => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },

    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      price: true,
      inStock: true,
      gender: true,
      images: { select: { url: true } },
      sizes: { select: { size: true } },
    },
  });

  return product;
};
