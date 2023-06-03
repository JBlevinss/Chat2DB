import { useEffect, useRef, useState } from 'react';
import { addColorSchemeListener, colorSchemeListeners } from '@/components/Setting';
import { getOsTheme } from '@/utils';
import { ThemeType } from '@/constants';

const initialTheme = (() => {
  let theme = localStorage.getItem('theme');
  if (theme === 'followOs') {
    theme = getOsTheme();
  }
  return theme
})()

export function useTheme() {
  const [appTheme, setAppTheme] = useState(initialTheme);

  useEffect(() => {
    const uuid = addColorSchemeListener(setAppTheme);
    return () => {
      delete colorSchemeListeners[uuid]
    }
  }, []);

  function handelAppThemeChange(theme: ThemeType, callback?: Function){
    if (theme === ThemeType.FollowOs) {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeType.Dark : ThemeType.Light
    }
    Object.keys(colorSchemeListeners)?.forEach(t => {
      colorSchemeListeners[t]?.(theme)
    })
    document.documentElement.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
    callback?.();
  }

  return [appTheme, handelAppThemeChange] as any;
}