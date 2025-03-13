"use client";

import {
  DialogProvider,
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
          <DialogProvider>{children}</DialogProvider>
        </NavigationBarLayout>
      </body>
    </html>
  );
};
