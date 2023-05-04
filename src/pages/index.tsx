import { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      title={"Teslo-Shop - Home"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
    >
      <Typography variant="h1">Home</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Products:
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
