import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server";
import type { CompleteProduct, UpdateProduct } from "@/interfaces";
import { validations } from "@/utils";
import cloudinary from "@/server/cloudinary";

type Data =
  | {
      message: string;
    }
  | CompleteProduct[]
  | CompleteProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "PUT":
      return updateProduct(req, res);

    case "POST":
      return createProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const dbProducts = await prisma.product.findMany({
    orderBy: { title: "asc" },

    include: {
      images: {
        orderBy: { order: "asc" },
      },
      sizes: true,
      tags: true,
    },
  });

  const products: CompleteProduct[] = dbProducts.map((product) => ({
    ...product,
    images: product.images.map((image) => ({
      ...image,
      url: image.url.includes("http") ? image.url : `/products/${image.url}`,
    })),
  }));

  return res.status(200).json(products);
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    id = "",
    images = [],
    tags,
    sizes,
    price,
    inStock,
    ...body
  } = req.body as UpdateProduct;

  if (!validations.isUUID(id)) {
    return res.status(400).json({ message: "Product id is invalid" });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: "You need at least 2 images" });
  }

  const filteredImages = images.map((image) =>
    image.includes("https") ? image : image.replace("/products/", "")
  );

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        sizes: true,
        tags: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    const existingImageUrls = product.images.map((image) => image.url);
    const urlsToDelete = existingImageUrls.filter(
      (url) => !filteredImages.includes(url)
    );
    const urlsToAdd = filteredImages.filter(
      (url) => !existingImageUrls.includes(url)
    );

    const existingTags = product.tags.map((tag) => tag.name);
    const tagsToDelete = existingTags.filter((tag) => !tags.includes(tag));
    const tagsToAdd = tags.filter((tag) => !existingTags.includes(tag));

    const existingSizes = product.sizes.map((size) => size.size);
    const sizesToDelete = existingSizes.filter((size) => !sizes.includes(size));
    const sizesToAdd = sizes.filter((size) => !existingSizes.includes(size));

    urlsToDelete.forEach(async (img) => {
      const [fileId, extension] = img
        .substring(img.lastIndexOf("/") + 1)
        .split(".");

      await cloudinary.uploader.destroy(`Teslo-shop/${fileId}`);
    });

    const updateProduct = await prisma.product.update({
      where: { id },
      data: {
        ...body,
        price: Number(price),
        inStock: Number(inStock),
        images: {
          deleteMany: {
            productId: id,
            url: { in: urlsToDelete },
          },
          connectOrCreate: urlsToAdd.map((img, i) => ({
            where: { url: img },
            create: {
              url: img,
              order: existingImageUrls.length - urlsToDelete.length + i,
            },
          })),
        },
        tags: {
          connectOrCreate: tagsToAdd.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
          disconnect: tagsToDelete.map((tag) => ({ name: tag })),
        },
        sizes: {
          connectOrCreate: sizesToAdd.map((size) => ({
            where: { size },
            create: { size },
          })),
          disconnect: sizesToDelete.map((size) => ({ size })),
        },
      },

      include: {
        images: true,
        sizes: true,
        tags: true,
      },
    });

    return res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error when updating the product" });
  }
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    id = "",
    images = [],
    tags,
    sizes,
    price,
    inStock,
    ...body
  } = req.body as UpdateProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: "You need at least 2 images" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        ...body,
        inStock: Number(inStock),
        price: Number(price),
        images: {
          create: images.map((img, i) => ({
            url: img,
            order: i,
          })),
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        sizes: {
          connectOrCreate: sizes.map((size) => ({
            where: { size },
            create: { size },
          })),
        },
      },

      include: {
        images: true,
        sizes: true,
        tags: true,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error when creating the product" });
  }
}
