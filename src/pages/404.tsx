import { NextPage } from "next";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { ShopLayout } from "@/components/layouts";

const Custom404: NextPage = () => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <ShopLayout
      title="404 | Page not found"
      pageDescription="No hay nada que mostrar"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 160px)"
      >
        <Typography variant="h1" fontSize={matches ? 80 : 40} fontWeight="300">
          404 |
        </Typography>
        <Typography marginLeft={2}>We could not find any pages</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
