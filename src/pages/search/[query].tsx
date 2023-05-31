import { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { GetProducts } from "@/interfaces";
import { getAllProducts, getProductByTerm } from "@/server/products";

interface Props {
  products: GetProducts[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={"Teslo-Shop - Search"}
      pageDescription={
        "Discover the latest fashion trends at Teslo Shop. Shop our selection of clothing and accessories for men and women. Find everything you need to elevate your style, from everyday essentials to statement pieces."
      }
    >
      <Typography variant="h1">Search products</Typography>

      {foundProducts ? (
        <Typography variant="h2" textTransform="capitalize" sx={{ my: 2 }}>
          {query}
        </Typography>
      ) : (
        <>
          <Box display="flex" gap={2} sx={{ my: 1 }}>
            <Typography variant="h2">
              {"We couldn't find any products with: "}
            </Typography>
            <Typography
              variant="h2"
              color="secondary"
              textTransform="capitalize"
            >
              {query}
            </Typography>
          </Box>
          <Box display="flex" gap={2} sx={{ my: 1 }}>
            <Typography variant="body1">
              {"Here we have other articles that might interest you."}
            </Typography>
          </Box>
        </>
      )}

      <ProductList products={products} isLoading={false} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await getProductByTerm(query);

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
