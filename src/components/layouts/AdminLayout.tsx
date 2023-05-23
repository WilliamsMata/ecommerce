import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Box, Breakpoint, Container, Typography } from "@mui/material";
import { SideMenu } from "../ui";
import { AdminNavbar } from "../admin";

interface Props extends PropsWithChildren {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
  maxWidth?: Breakpoint;
}

export const AdminLayout: FC<Props> = ({
  children,
  title,
  subTitle,
  icon,
  maxWidth,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AdminNavbar />

      <SideMenu />

      <Container
        component="main"
        maxWidth={maxWidth ? maxWidth : "xl"}
        sx={{
          mt: 8,
          paddingInline: 2,
        }}
      >
        <Box display="flex" flexDirection="column" sx={{ mb: 2 }}>
          <Typography display="flex" alignItems="center" gap={1} variant="h1">
            {icon} {title}
          </Typography>

          <Typography variant="h2">{subTitle}</Typography>
        </Box>

        <Box className="fadeIn">{children}</Box>
      </Container>
    </>
  );
};
