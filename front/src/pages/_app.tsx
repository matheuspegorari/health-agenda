import React from "react";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
};

export default MyApp;
