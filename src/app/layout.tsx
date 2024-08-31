import './layout.scss';

import type { Metadata } from 'next';
import React, { type PropsWithChildren } from 'react';

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
      <Navigation />
      <ControlsProvider>{children}</ControlsProvider>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
