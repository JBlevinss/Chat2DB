import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  antdLightTheme,
  antdDarkTheme,
  antdPrimaryColor,
} from '@/theme/antdTheme';

import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import { useTheme } from '@/hooks';
import { isEn } from '@/utils/check';
import { ThemeType, PrimaryColorType } from '@/constants/common';
import styles from './index.less';
import {
  getLang,
  getPrimaryColor,
  getTheme,
  setLang,
} from '@/utils/localStorage';
declare global {
  interface Window {
    _Lang: string;
    _ENV: string;
    _APP_PORT: string;
    _BUILD_TIME: string;
    _BaseURL: string;
  }
  const __APP_VERSION__: string;
  const __BUILD_TIME__: string;
}

window._ENV = process.env.UMI_ENV! || 'local';
window._Lang = getLang();

export const colorSchemeListeners: { [key: string]: Function } = {};

export function addColorSchemeListener(callback: Function) {
  const uuid = uuidv4();
  colorSchemeListeners[uuid] = callback;
  return uuid;
}

function Layout() {
  const [appTheme, setAppTheme] = useTheme();
  const [antdTheme, setAntdTheme] = useState<any>({});
  const [initEnd, setInitEnd] = useState(false);

  useLayoutEffect(() => {
    const antdTheme =
      appTheme.backgroundColor === ThemeType.Light
        ? antdLightTheme
        : antdDarkTheme;
    antdTheme.token = {
      ...antdTheme.token,
      ...(antdPrimaryColor[appTheme.primaryColor as PrimaryColorType] || {}),
    };
    setAntdTheme({ ...antdTheme });
    console.log({ ...antdTheme })
  }, [appTheme]);

  // 监听系统(OS)主题变化
  useLayoutEffect(() => {
    function change(e: any) {
      setAppTheme({
        ...appTheme,
        backgroundColor: e.matches ? ThemeType.Dark : ThemeType.Light,
      });
    }

    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    themeMedia.addListener(change);
    return () => {
      themeMedia.removeListener(change);
    };
  }, []);

  useLayoutEffect(() => {
    collectInitApp();
  }, []);

  function collectInitApp() {
    initTheme();
    initLang();
    setInitEnd(true);
  }

  function initTheme() {
    let theme = getTheme();
    if (theme === ThemeType.FollowOs) {
      theme =
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? ThemeType.Dark
          : ThemeType.Light) || ThemeType.Dark;
    }
    document.documentElement.setAttribute('theme', theme);
    document.documentElement.setAttribute('primary-color', getPrimaryColor());
  }

  function initLang() {
    if (!getLang()) {
      setLang('en-us');
      document.documentElement.setAttribute('lang', 'en-us');
    }
  }

  return (
    <ConfigProvider locale={isEn ? antdEnUS : antdZhCN} theme={antdTheme}>
      {
        initEnd &&
        <div className={styles.app}>
          <Outlet />
        </div>
      }
    </ConfigProvider>
  );
}

export default Layout;
