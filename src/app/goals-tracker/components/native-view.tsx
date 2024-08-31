import React from 'react';

import { ViewProps } from '@/types';

export const NativeView: React.FC<ViewProps> = ({ goals }) => {
  return <div>{goals.map((goal) => goal.Goal)} NativeView </div>;
};
