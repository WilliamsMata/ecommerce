import { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { Size } from "@prisma/client";

import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ShopLayout } from "@/components/layouts";
import { ItemCounter } from "@/components/ui";
import { CartProduct, GetProductBySlug } from "@/interfaces";
import { getAllProductSlug, getProductBySlug } from "@/server/products";

interface Props {
  product: GetProductBySlug;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<CartProduct>({
    id: product.id,
    image: product.images[0].url,
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSizeChange = (size: Size) => {
    setTempCartProduct({
      ...tempCartProduct,
      size,
    });
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          <Box display="flex" flexDirection="column">
            {/* Títulos */}
            <Typography variant="h1">{product.title}</Typography>
            <Typography variant="subtitle1">${product.price}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }} display="flex" flexDirection="column" gap={2}>
              <Typography variant="subtitle2">Size</Typography>
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSizeChange}
              />

              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter />
            </Box>

            {/* Agregar al carrito */}
            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn">
                {tempCartProduct.size ? "Add to cart" : "Select a size"}
              </Button>
            ) : (
              <Chip label="Not available" color="error" variant="outlined" />
            )}

            {/* Descripción */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await getAllProductSlug(); // your fetch function here

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug = "" } = params as { slug: string };

  const product = await getProductBySlug(slug); // your fetch function here

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400, // 60 * 60 * 24,
  };
};

export default ProductPage;
