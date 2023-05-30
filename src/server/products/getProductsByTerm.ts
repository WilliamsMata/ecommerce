import { prisma } from "../db";
import { GetProducts } from "@/interfaces";

export const getProductByTerm = async (
  term: string
): Promise<GetProducts[]> => {
  term = term.toString().toLowerCase();

  const dbProducts = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: term } },
        { tags: { some: { name: { contains: term } } } },
      ],
    },

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
