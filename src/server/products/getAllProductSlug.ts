import { prisma } from "../db";
import { ProductSlug } from "@/interfaces";

export const getAllProductSlug = (): Promise<ProductSlug[]> => {
  return prisma.product.findMany({
    select: { slug: true },
  });
};
