import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

export const Theme: ThemeConfig = {
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
      borderRight: '1px solid #3f3f45',
    },
    Menu: {
      itemHeight: 30,
    },
    Button: {
      paddingInlineSM: 11,
    },
  },
};
