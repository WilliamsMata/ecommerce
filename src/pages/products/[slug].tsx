import { useContext, useState } from "react";
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { Size } from "@prisma/client";

import { CartContext } from "@/context";
import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ShopLayout } from "@/components/layouts";
import { ItemCounter } from "@/components/ui";
import type { CartProduct, CompleteProduct } from "@/interfaces";
import { getAllProductSlug, getProductBySlug } from "@/server/products";

interface Props {
  product: CompleteProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

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

  const onUpdateQuantity = (newValue: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity: newValue,
    });
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;

    addProductToCart(tempCartProduct);

    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={7}
          lg={8}
          sx={{ aspectRatio: "1/1", width: "100%" }}
        >
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

              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock}
              />
            </Box>

            {/* Agregar al carrito */}
            {product.inStock > 0 ? (
              <Button
                onClick={onAddProduct}
                color="secondary"
                className="circular-btn"
              >
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
