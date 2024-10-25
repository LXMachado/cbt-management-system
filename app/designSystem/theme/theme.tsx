import { theme } from 'antd'

export const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
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
    colorSplit: 'rgba(255, 255, 255, 0.07)',

    // Typography
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    //Form
    controlItemBgActive: '#27272a',
    controlOutline: 'rgba(255, 255, 255, 0.15)',
    controlHeight: 36,
    controlHeightSM: 32,

    // Layout
    padding: 16,
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

    borderRadius: 6,
    lineType: 'solid',
    lineWidth: 1,
    motion: false,
  },
  components: {
    Form: {
      itemMarginBottom: '22px',
    },
    Layout: {
      headerBg: 'black', // topBar background color
      footerBg: 'black', // footer background color
      siderBg: 'black', // leftBar background color
      siderBorderRight: '1px solid #27272a', // leftBar border right
      headerBorderBottom: '1px solid #27272a', // topBar border bottom
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      //topbar menu items
      horizontalItemSelectedColor: 'white',
      horizontalItemSelectedBg: 'transparent',
      //leftbar menu items
      itemSelectedColor: 'white',
      itemSelectedBg: 'transparent',
      itemActiveBg: 'transparent',
      //topbar and leftbar menu items
      itemHoverColor: 'white',
      itemHoverBg: 'transparent',
      itemColor: '#909090',
      itemBg: 'transparent',
      iconMarginInlineEnd: 8,
      iconSize: 16,
    },
    Button: {
      paddingInlineSM: 11,
      colorTextLightSolid: 'black',
      primaryColor: 'black',
      fontWeight: 500,
    },
  },
}

export { darkTheme as Theme }
export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Colors
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
    colorSplit: 'rgba(0, 0, 0, 0.06)',

    // Typography
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    //Form
    controlItemBgActive: '#e6f7ff',
    controlOutline: 'rgba(0, 0, 0, 0.02)',
    controlHeight: 36,
    controlHeightSM: 32,

    // Layout
    padding: 16,
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

    borderRadius: 6,
    lineType: 'solid',
    lineWidth: 1,
    motion: false,
  },
  components: {
    Form: {
      itemMarginBottom: '22px',
    },
    Layout: {
      headerBg: '#ffffff', // topBar background color
      footerBg: '#ffffff', // footer background color
      siderBg: '#ffffff', // leftBar background color
      siderBorderRight: '1px solid #f0f0f0', // leftBar border right
      headerBorderBottom: '1px solid #f0f0f0', // topBar border bottom
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      //topbar menu items
      horizontalItemSelectedColor: 'rgba(0, 0, 0, 0.85)',
      horizontalItemSelectedBg: 'transparent',
      //leftbar menu items
      itemSelectedColor: 'rgba(0, 0, 0, 0.85)',
      itemSelectedBg: 'transparent',
      itemActiveBg: 'transparent',
      //topbar and leftbar menu items
      itemHoverColor: 'rgba(0, 0, 0, 0.85)',
      itemHoverBg: 'transparent',
      itemColor: 'rgba(0, 0, 0, 0.65)',
      itemBg: 'transparent',
      iconMarginInlineEnd: 8,
      iconSize: 16,
    },
    Button: {
      paddingInlineSM: 11,
      colorTextLightSolid: '#ffffff',
      primaryColor: '#00a1ec',
      fontWeight: 500,
    },
  },
}
