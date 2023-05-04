import { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { GetProducts } from "@/interfaces";

const HomePage: NextPage = () => {
  const { data, isLoading } = useProducts<GetProducts[]>("/products");

  return (
    <ShopLayout
      title={"Teslo-Shop - Home"}
      pageDescription={
        "Discover the latest fashion trends at Teslo Shop. Shop our selection of clothing and accessories for men and women. Find everything you need to elevate your style, from everyday essentials to statement pieces."
      }
    >
      <Typography variant="h1">Home</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Products:
      </Typography>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={data ? data : []} />
      )}
    </ShopLayout>
  );
};

export default HomePage;
