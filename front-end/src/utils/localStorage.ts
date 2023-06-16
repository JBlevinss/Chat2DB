import { ThemeType, PrimaryColorType } from '@/constants/common';
import { LangType } from '@/constants/common';
import { ICurrentWorkspaceDatabase } from '@/pages/main/workspace'

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

export function setCurrentWorkspaceDatabase(value:ICurrentWorkspaceDatabase) {
  return localStorage.setItem('current-workspace-database', JSON.stringify(value));
}  

export function getCurrentWorkspaceDatabase() {
  const currentWorkspaceDatabase = localStorage.getItem('current-workspace-database');
  if (currentWorkspaceDatabase) {
    return  JSON.parse(currentWorkspaceDatabase)
  }
  return {
    labelArr: [],
    valueArr: [],
  };
}  
