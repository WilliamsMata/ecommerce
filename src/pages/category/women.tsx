import { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { GetProducts } from "@/interfaces";

const WomenPage: NextPage = () => {
  const { data, isLoading } = useProducts<GetProducts[]>(
    "/products?gender=women"
  );

  return (
    <ShopLayout
      title={"Teslo-Shop - Women"}
      pageDescription={
        "Welcome to Teslo Shop for Women. Discover our selection of women's clothing. Find the latest fashion trends for women, from t-shirts and pants to jackets and accessories. Shop now at Teslo Shop!"
      }
    >
      <Typography variant="h1">Men</Typography>
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

export default WomenPage;
