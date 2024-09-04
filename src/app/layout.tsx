import './layout.scss';

import type { Metadata } from 'next';
import React, { type PropsWithChildren } from 'react';

import { DialogContextProvider } from '@/contexts';

import { ControlsProvider, Footer, Navigation } from './components';

export const metadata: Metadata = {
  description: 'Page for displaying my daily goals tracker',
  title: 'Daily goals tracker',
  authors: {
    name: 'Jakub Gaik',
  },
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <html lang='en'>
    <body>
      <DialogContextProvider>
        <Navigation />
        <ControlsProvider>{children}</ControlsProvider>
        <Footer />
      </DialogContextProvider>
    </body>
  </html>
);

export default RootLayout;
