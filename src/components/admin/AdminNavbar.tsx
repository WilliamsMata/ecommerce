import { useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import Link from "../Link";
import { UiContext } from "@/context";

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

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

          <Box>
            <Button onClick={toggleSideMenu}>Menú</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
