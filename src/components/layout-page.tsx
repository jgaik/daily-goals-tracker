"use client";

import { ApiDataProvider } from "@/contexts";
import {
  Link,
  NavigationBarLayout,
  useYamoriTheme,
} from "@yamori-design/react-components";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

export const LayoutPage: React.FC<PropsWithChildren> = ({ children }) => {
  const yamoriTheme = useYamoriTheme();

  return (
    <html data-ag-theme-mode={yamoriTheme}>
      <body>
        <NavigationBarLayout
          links={[
            <NextLink passHref legacyBehavior href="/" key="home">
              <Link>Tracker</Link>
            </NextLink>,
            <NextLink passHref legacyBehavior href="/goals" key="goals">
              <Link>Goals</Link>
            </NextLink>,
          ]}
        >
          <ApiDataProvider>{children}</ApiDataProvider>
        </NavigationBarLayout>
      </body>
    </html>
  );
};
