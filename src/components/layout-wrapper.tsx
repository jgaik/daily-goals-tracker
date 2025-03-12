"use client";

import {
  DialogProvider,
  NavigationBarLayout,
} from "@yamori-design/react-components";
import React, { PropsWithChildren } from "react";

export const LayoutWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <NavigationBarLayout links={[]}>
    <DialogProvider>{children}</DialogProvider>
  </NavigationBarLayout>
);
