<<<<<<< HEAD
import { useLayoutEffect } from 'react';
import { Link, Outlet } from 'umi';
import { ConfigProvider, theme } from 'antd';
import styles from './index.less';
import { useState } from 'react';
import { ThemeType } from '@/constants';
import { useTheme } from '@/utils/hooks';

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
=======
import { Outlet } from 'umi';
import { ConfigProvider, theme } from 'antd';
import styles from './index.less';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
>>>>>>> d036f12318203d0b85c369df82b16d82d9dda990

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
<<<<<<< HEAD
    <ConfigProvider theme={appTheme}>
      <div className={styles.app}>
=======
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <div className={styles.navs}>
>>>>>>> d036f12318203d0b85c369df82b16d82d9dda990
        <Outlet />
      </div>
    </ConfigProvider>
  );
}


