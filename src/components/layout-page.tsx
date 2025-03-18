"use client";

import { ApiDataProvider } from "@/contexts";
import {
  NavigationBarLayout,
  useYamoriTheme,
} from "@yamori-design/react-components";
import { PropsWithChildren } from "react";

export const LayoutPage: React.FC<PropsWithChildren> = ({ children }) => {
  const yamoriTheme = useYamoriTheme();

  return (
    <html data-ag-theme-mode={yamoriTheme}>
      <body>
        <NavigationBarLayout>
          <ApiDataProvider>{children}</ApiDataProvider>
        </NavigationBarLayout>
      </body>
    </html>
  );
};
