import { GetProducts } from "@/interfaces";
import { prisma } from "../db";

export const getAllProducts = async (): Promise<GetProducts[]> => {
  const products = await prisma.product.findMany({
    select: {
      title: true,
      price: true,
      inStock: true,
      slug: true,
      images: { select: { url: true } },
    },
  });

  return products;
};
