import { prisma } from "../db";
import { ProductSlug } from "@/interfaces";

export const getAllProductSlug = async (): Promise<ProductSlug[]> => {
  const slugs = await prisma.product.findMany({
    select: { slug: true },
  });

  return slugs;
};
