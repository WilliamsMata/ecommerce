import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Link from "../Link";

interface Props extends PropsWithChildren {
  title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AppBar>
        <Toolbar component="nav">
          <Link href="/" display="flex" alignItems="center">
            <Typography variant="h6">Teslo | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Container component="main">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 160px)"
        >
          {children}
        </Box>
      </Container>
    </>
  );
};
