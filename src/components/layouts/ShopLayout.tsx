import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { Navbar, SideMenu } from "../ui";

interface Props extends PropsWithChildren {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <Navbar />

      <SideMenu />

      <Container
        component="main"
        maxWidth="xl"
        sx={{
          mt: 8,
          paddingInline: 2,
        }}
      >
        {children}
      </Container>

      {/* Footer */}
      <footer>{/* Todo: custom footer */}</footer>
    </>
  );
};
