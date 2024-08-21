import './layout.scss';

import type { Metadata } from 'next';
import React, { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  description: 'Page for displaying my daily goals tracker',
  title: 'Daily goals tracker',
  authors: {
    name: 'Jakub Gaik',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
