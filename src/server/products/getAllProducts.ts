import { GetProducts } from "@/interfaces";
import { prisma } from "../db";

export const getAllProducts = (): Promise<GetProducts[]> => {
  return prisma.product.findMany({
    select: {
      title: true,
      price: true,
      inStock: true,
      slug: true,
      images: { select: { url: true } },
    },
  });
};
