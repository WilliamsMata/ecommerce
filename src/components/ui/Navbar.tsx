import { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Input,
  InputAdornment,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import ClearOutlined from "@mui/icons-material/ClearOutlined";

import Link from "../Link";
import { CartContext, UiContext } from "@/context";

export const Navbar = () => {
  const { route, push } = useRouter();

  const { toggleSideMenu } = useContext(UiContext);

  const { orderSummary } = useContext(CartContext);
  const { numberOfItems } = orderSummary;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar
          sx={{ justifyContent: "space-between" }}
          component="nav"
          disableGutters
        >
          <Link href="/" display="flex" alignItems="center">
            <Typography variant="h6">Teslo | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>

          <Box
            sx={{
              display: isSearchVisible ? "none" : { xs: "none", sm: "flex" },
              ml: 5,
              gap: 0.5,
            }}
          >
            <Link href="/category/men">
              <Button color={route === "/category/men" ? "primary" : "info"}>
                Men
              </Button>
            </Link>

            <Link href="/category/women">
              <Button color={route === "/category/women" ? "primary" : "info"}>
                Women
              </Button>
            </Link>

            <Link href="/category/kids">
              <Button color={route === "/category/kids" ? "primary" : "info"}>
                Kids
              </Button>
            </Link>
          </Box>

          <Box>
            {/* Pantallas grandes */}

            {isSearchVisible ? (
              <Input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
                type="text"
                placeholder="Search..."
                className="fadeIn"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsSearchVisible(false)}>
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            ) : (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
                title="Search"
              >
                <SearchOutlined />
              </IconButton>
            )}

            {/* Pantallas pequeñas */}
            <IconButton
              title="Search"
              onClick={toggleSideMenu}
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
            >
              <SearchOutlined />
            </IconButton>

            <Link href="/cart">
              <IconButton>
                <Badge
                  badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                  color="secondary"
                >
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>

            <Button onClick={toggleSideMenu}>Menu</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
