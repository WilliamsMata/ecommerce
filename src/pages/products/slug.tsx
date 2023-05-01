import { NextPage } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { initialData } from "@/database";
import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";

const product = initialData.products[0];

const slug: NextPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Box display="flex" flexDirection="column">
            {/* Títulos */}
            <Typography variant="h1">{product.title}</Typography>
            <Typography variant="subtitle1">${product.price}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>

              <ItemCounter />

              <SizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {/* Agregar al carrito */}
            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            {/* <Chip label="Not available" color="error" variant="outlined" /> */}

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

export default slug;
