import type { Metadata } from "next";
import React, { type PropsWithChildren } from "react";
import "@yamori-design/styles/dist/global.css";
import {
  DialogProvider,
  NavigationBarLayout,
} from "@yamori-design/react-components";

export const metadata: Metadata = {
  description: "Page for displaying my daily goals tracker",
  title: "Daily goals tracker",
  authors: {
    name: "Jakub Gaik",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <NavigationBarLayout>
          <DialogProvider>{children}</DialogProvider>
        </NavigationBarLayout>
      </body>
    </html>
  );
}
