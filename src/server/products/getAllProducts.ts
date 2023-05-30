import { GetProducts } from "@/interfaces";
import { prisma } from "../db";

export const getAllProducts = async (): Promise<GetProducts[]> => {
  const dbProducts = await prisma.product.findMany({
    select: {
      title: true,
      price: true,
      inStock: true,
      slug: true,
      images: { select: { url: true } },
    },
  });

  const products: GetProducts[] = dbProducts.map((product) => ({
    ...product,
    images: product.images.map((image) => ({
      ...image,
      url: image.url.includes("http") ? image.url : `/products/${image.url}`,
    })),
  }));

  return products;
};
