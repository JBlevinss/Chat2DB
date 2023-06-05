import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import styles from './index.less';
import { useState } from 'react';
import { ThemeType } from '@/constants';
import { useTheme } from '@/utils/hooks';
import { v4 as uuidv4 } from 'uuid';
import antdDarkTheme from '@/theme/antdTheme/dark';
import antdLightTheme from '@/theme/antdTheme/light';
import antdPrimaryColor from '@/theme/antdTheme/primaryColor';
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

export const colorSchemeListeners: { [key: string]: Function } = {};

export function addColorSchemeListener(callback: Function) {
  const uuid = uuidv4();
  colorSchemeListeners[uuid] = callback;
  return uuid
}

export default function Layout() {
  const [appTheme, setAppTheme] = useTheme();
  const [antdTheme, setAntdTheme] = useState<any>({});

  useLayoutEffect(() => {
    const antdTheme = appTheme.backgroundColor === ThemeType.Light ? antdLightTheme : antdDarkTheme;

    antdTheme.token = {
      ...antdTheme.token,
      ...antdPrimaryColor[appTheme.primaryColor] || {},
    }
    console.log(antdPrimaryColor[appTheme.primaryColor])
    console.log(antdTheme)
    setAntdTheme(antdTheme);
  }, [appTheme])

  // 监听系统(OS)主题变化
  useLayoutEffect(() => {

    function change(e: any) {
      setAppTheme({
        ...appTheme,
        backgroundColor: e.matches ? ThemeType.Dark : ThemeType.Light
      })
    }

    const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    themeMedia.addListener(change);
    return () => {
      themeMedia.removeListener(change)
    }
  }, [])

  useLayoutEffect(() => {
    collectInitApp();
  }, []);

  function collectInitApp() {
    initTheme();
    initLang();
  }

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

  return (
    <ConfigProvider
      locale={enUS}
      theme={antdTheme}
    >
      <div className={styles.app}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}


