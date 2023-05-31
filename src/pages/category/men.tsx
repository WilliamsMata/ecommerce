import { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { GetProducts } from "@/interfaces";

const MenPage: NextPage = () => {
  const { data, isLoading } = useProducts<GetProducts[]>(
    "/products?gender=men"
  );

  return (
    <ShopLayout
      title={"Teslo-Shop - Men"}
      pageDescription={
        "Welcome to Teslo Shop for Men. Discover our selection of men's clothing. Find the latest fashion trends for men, from t-shirts and pants to jackets and accessories. Shop now at Teslo Shop!"
      }
    >
      <Typography variant="h1">Men</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Products:
      </Typography>

      <ProductList products={data ? data : []} isLoading={isLoading} />
    </ShopLayout>
  );
};

export default MenPage;
