import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { UiProvider, CartProvider, AuthProvider } from "@/context";
import theme from "@/themes/theme";
import { createEmotionCache } from "@/utils";

import "@/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          }}
        >
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <AuthProvider>
              <CartProvider>
                <UiProvider>
                  <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UiProvider>
              </CartProvider>
            </AuthProvider>
          </SWRConfig>
        </PayPalScriptProvider>
      </SessionProvider>
    </CacheProvider>
  );
}
