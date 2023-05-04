import { FC } from "react";
import { Grid } from "@mui/material";
import { GetProducts } from "@/interfaces";
import { ProductCard } from "./";

interface Props {
  products: GetProducts[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4} component="section">
      {products.map((product) => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </Grid>
  );
};
