"use client";

import { store } from "@/redux/store";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode, Suspense } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingLayout } from "./components/LoadingLoyout";
import "./globals.css";
import NextAuthProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${inter.className} w-screen h-screen bg-neutral-950`}>
          <NextTopLoader color="#ff8400" />
          <ToastContainer />
          <div id="modal"></div>
          <NextAuthProvider>{children}</NextAuthProvider>
          <Suspense fallback={null}>
            <LoadingLayout />
          </Suspense>
        </body>
      </html>
    </Provider>
  );
}
