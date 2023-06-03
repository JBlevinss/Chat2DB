import { useLayoutEffect } from 'react';
import { Link, Outlet } from 'umi';
import { ConfigProvider, theme } from 'antd';
import styles from './index.less';
import { useState } from 'react';
import { ThemeType } from '@/constants';
import { useTheme } from '@/utils/hooks';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

declare global {
  interface Window {
    _ENV: string;
    _APP_PORT: string;
    _BUILD_TIME: string;
    _BaseURL: string;
  }
  const __APP_VERSION__: string;
  const __BUILD_TIME__: string;
}

window._ENV = process.env.UMI_ENV! || 'local';

const darktheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    "wireframe": true,
    "borderRadius": 4,
    "colorBgBase": "#22272e",
    "colorBgMask": "rgba(28,33,40,0.8)",
    "colorBgElevated": "#22272e"
  }
}

const lighttheme = {}

export default function Layout() {
  const [appTheme] = useTheme();

  useLayoutEffect(() => {
    initApp();
  }, []);

  function initTheme() {
    let theme = localStorage.getItem('theme') || ThemeType.Dark;
    if (theme === ThemeType.FollowOs) {
      theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeType.Dark : ThemeType.Light) || ThemeType.Light;
    }
    document.documentElement.setAttribute('theme', theme);
    document.documentElement.setAttribute(
      'primary-color',
      localStorage.getItem('primary-color') || 'polar-blue',
    );
  }

  function initLang() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en-us');
      document.documentElement.setAttribute('lang', 'en-us');
    }
  }

  function initApp() {
    initTheme();
    initLang();
  }

  return (
    <ConfigProvider
      locale={enUS}
      theme={lighttheme}
    >
      <div className={styles.app}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}


