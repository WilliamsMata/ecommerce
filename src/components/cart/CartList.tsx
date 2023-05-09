import { FC, useContext } from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";

import Link from "../Link";
import { ItemCounter } from "../ui";
import { CartContext } from "@/context";
import { CartProduct } from "@/interfaces";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: CartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          key={product.slug + product.size}
          container
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Grid item xs={4} sm={2.5}>
            <Link href={`/products/${product.slug}`}>
              <Image
                src={`/products/${product.image}`}
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
                Size: <strong>{product.size}</strong>
              </Typography>
            </Box>

            {editable ? (
              <ItemCounter
                currentValue={product.quantity}
                maxValue={10}
                updatedQuantity={(newValue) =>
                  onNewCartQuantityValue(product, newValue)
                }
              />
            ) : (
              <Typography variant="h6">
                {product.quantity}{" "}
                {product.quantity > 1 ? "products" : "product"}
              </Typography>
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
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeCartProduct(product)}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
