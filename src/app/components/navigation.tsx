import Link from 'next/link';
import React from 'react';

import { Route } from '@/constants';
import { getTypedObjectKeys } from '@/utils';

export const Navigation: React.FC = () => {
  return (
    <nav className='navigation'>
      <ul>
        {getTypedObjectKeys(Route).map((route) => (
          <li key={route}>
            <Link href={Route[route]}>{route}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
