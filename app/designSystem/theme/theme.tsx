import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#00a1ec',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: 'white',
    colorLink: '#00a1ec',
    colorBgBase: 'black',
    colorBgContainer: 'black',
    colorBorder: '#3f3f45',
    colorBorderSecondary: '#27272a',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    borderRadius: 6,
    lineWidth: 1,
  },
  components: {
    Layout: {
      headerBg: 'black',
      footerBg: 'black',
      siderBg: 'black',
    },
    Menu: {
      itemHeight: 30,
    },
    Button: {
      paddingInlineSM: 11,
    },
  },
};

export { darkTheme as Theme };

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#00a1ec',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: 'rgba(0, 0, 0, 0.85)',
    colorLink: '#00a1ec',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    borderRadius: 6,
    lineWidth: 1,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      footerBg: '#ffffff',
      siderBg: '#ffffff',
    },
    Menu: {
      itemHeight: 30,
    },
    Button: {
      paddingInlineSM: 11,
    },
  },
};
