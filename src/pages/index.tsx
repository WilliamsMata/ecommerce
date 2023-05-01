import Link from "@/components/Link";
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <ShopLayout
      title={"Teslo-Shop - Home"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
    >
      <Typography variant="h1">Home</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
    </ShopLayout>
  );
}
