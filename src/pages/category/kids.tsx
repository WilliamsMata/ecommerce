import { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { GetProducts } from "@/interfaces";

const KidsPage: NextPage = () => {
  const { data, isLoading } = useProducts<GetProducts[]>(
    "/products?gender=kid"
  );

  return (
    <ShopLayout
      title={"Teslo-Shop - Kids"}
      pageDescription={
        "Welcome to Teslo Shop for kids. Discover our selection of kids's clothing. Find the latest fashion trends for kids, from t-shirts and pants to jackets and accessories. Shop now at Teslo Shop!"
      }
    >
      <Typography variant="h1">kids</Typography>
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

export default KidsPage;
