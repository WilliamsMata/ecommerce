import { useRouter } from "next/router";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Link from "../Link";

export const Navbar = () => {
  const { route } = useRouter();

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }} component="nav">
        <Link href="/" display="flex" alignItems="center">
          <Typography variant="h6">Teslo | </Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link href="/category/men">
            <Button color={route === "/category/men" ? "primary" : "info"}>
              Hombres
            </Button>
          </Link>

          <Link href="/category/women">
            <Button color={route === "/category/women" ? "primary" : "info"}>
              Mujeres
            </Button>
          </Link>

          <Link href="/category/kids">
            <Button color={route === "/category/kids" ? "primary" : "info"}>
              Niños
            </Button>
          </Link>
        </Box>

        <Box>
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <Link href="/cart">
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>

          <Button>Menú</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
