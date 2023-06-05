import { useEffect, useRef, useState } from 'react';
import { addColorSchemeListener, colorSchemeListeners } from '@/layouts';
import { getOsTheme } from '@/utils';
import { ThemeType } from '@/constants';

const initialTheme = (() => {
  let backgroundColor = localStorage.getItem('theme') as ThemeType  || ThemeType.Dark;
  let primaryColor = localStorage.getItem('primaryColor') || 'polar-blue';
  if (backgroundColor === 'followOs') {
    backgroundColor = getOsTheme();
  }
  return {
    backgroundColor,
    primaryColor
  }
})()

interface ITheme {
  backgroundColor:ThemeType,
  primaryColor: string
}

export function useTheme() {
  const [appTheme, setAppTheme] = useState<ITheme>(initialTheme);

  useEffect(() => {
    const uuid = addColorSchemeListener(setAppTheme);
    return () => {
      delete colorSchemeListeners[uuid]
    }
  }, []);

  function handelAppThemeChange(theme:{backgroundColor: ThemeType, primaryColor:string}){
    if (theme.backgroundColor === ThemeType.FollowOs) {
      theme.backgroundColor = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeType.Dark : ThemeType.Light
    }
    Object.keys(colorSchemeListeners)?.forEach(t => {
      colorSchemeListeners[t]?.(theme)
    })
    document.documentElement.setAttribute('theme', theme.backgroundColor);
    localStorage.setItem('theme', theme.backgroundColor);
    document.documentElement.setAttribute('primary-color', theme.primaryColor);
    localStorage.setItem('primary-color', theme.primaryColor);
    // callback?.();
  }

  return [appTheme as ITheme, handelAppThemeChange] as any;
}