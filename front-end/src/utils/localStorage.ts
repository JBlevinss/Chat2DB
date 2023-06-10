import { ThemeType, PrimaryColorType } from '@/constants/common';
import { LangType } from '@/constants/common';

export function getLang(): LangType {
  return localStorage.getItem('lang') as LangType;
}

export function setLang(lang: LangType) {
  return localStorage.setItem('lang', lang);
}

export function getTheme(): ThemeType {
  return (localStorage.getItem('theme') as ThemeType) || ThemeType.Dark;
}

export function setTheme(theme: ThemeType) {
  return localStorage.setItem('theme', theme);
}

export function getPrimaryColor(): PrimaryColorType {
  return (
    (localStorage.getItem('primary-color') as PrimaryColorType) ||
    PrimaryColorType.Polar_Blue
  );
}

export function setPrimaryColor(primaryColor: PrimaryColorType) {
  return localStorage.setItem('primary-color', primaryColor);
}
