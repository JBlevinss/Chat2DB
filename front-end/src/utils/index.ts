import { ThemeType } from '@/typings/theme';

export function getOsTheme() {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeType.Dark
    : ThemeType.Light;
}
