import React from 'react';
import { Switch } from 'antd';
import { useTheme } from '../../../core/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  );
};
