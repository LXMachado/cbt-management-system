import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const ThemeToggle: React.FC = () => {
  return (
    <Text>
      <span role="img" aria-label="Dark Mode">🌙</span> Dark Mode
    </Text>
  );
};
