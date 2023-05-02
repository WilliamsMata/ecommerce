import { FC } from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";

import Link from "../Link";
import { ItemCounter } from "../ui";
import { initialData } from "@/database";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container key={product.slug} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={4} sm={2.5}>
            {/* TODO: Llevar a la pagina del producto */}
            <Link href={"/products/slug"}>
              <Image
                src={`/products/${product.images[0]}`}
                width={100}
                height={100}
                alt={product.title}
                style={{ objectFit: "cover" }}
              />
            </Link>
          </Grid>

          <Grid item xs={6} sm={7.5}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Size: <strong>M</strong>
              </Typography>
            </Box>

            {editable ? (
              <ItemCounter />
            ) : (
              <Typography variant="h6">3 items</Typography>
            )}
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>

            {editable && (
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
