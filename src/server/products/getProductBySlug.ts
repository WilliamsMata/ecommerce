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

  if (!product) return null;

  product.images = product.images.map((image) => ({
    ...image,
    url: image.url.includes("http") ? image.url : `/products/${image.url}`,
  }));

  return JSON.parse(JSON.stringify(product));
};
