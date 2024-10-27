import React from 'react';
import { Switch, ConfigProvider } from 'antd';
import { darkTheme, lightTheme } from '../../theme/theme';
import { ThemeConfig } from 'antd/es/config-provider/context';

export const ThemeToggle: React.FC = () => {
  const [{ theme }, setTheme] = ConfigProvider.useConfig();

  const toggleTheme = () => {
    const newTheme: ThemeConfig = theme?.colorBgBase === '#ffffff' ? darkTheme : lightTheme;
    setTheme((prevConfig) => ({ ...prevConfig, theme: newTheme }));
  };

  return (
    <Switch
      checked={theme?.colorBgBase !== '#ffffff'}
      onChange={toggleTheme}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  );
};
