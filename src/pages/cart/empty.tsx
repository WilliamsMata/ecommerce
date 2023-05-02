import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import RemoveShoppingCartOutlined from "@mui/icons-material/RemoveShoppingCartOutlined";

import Link from "@/components/Link";
import { ShopLayout } from "@/components/layouts";

const empty: NextPage = () => {
  return (
    <ShopLayout title="Empty cart" pageDescription="No items in the cart">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 160px)"
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Your cart is empty</Typography>

          <Link href="/" typography="h4" color="secondary">
            Come back
          </Link>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default empty;
