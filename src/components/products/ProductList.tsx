import { FC } from "react";
import { Grid } from "@mui/material";
import { GetProducts } from "@/interfaces";
import { ProductCard, ProductCardSkeleton } from "./";

interface Props {
  products: GetProducts[];
  isLoading: boolean;
}

export const ProductList: FC<Props> = ({ products, isLoading }) => {
  return (
    <Grid container spacing={4} component="section">
      {isLoading ? (
        <>
          {Array.from({ length: 9 }, (d, i) => i + 1).map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {products.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </>
      )}
    </Grid>
  );
};
