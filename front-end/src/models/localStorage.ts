import { PrimaryColorType, ThemeType } from '@/typings/theme';

type localStorageKey = 'lang' | 'theme' | 'primary-color';

type LangType = 'zh' | 'en-us';

interface StorageData {
  key: localStorageKey;
  value?: any;
}

export interface LocalStorageState {
  data: {
    lang: LangType;
    theme: ThemeType;
    ['primary-color']: PrimaryColorType;
    [key: string]: any;
  };
}

export default {
  namespace: 'localStorage',
  state: {
    data: {},
  } as LocalStorageState,

  reducers: {
    setLang(state: LocalStorageState, { payload }: { payload: LangType }) {
      // localStorage.setItem('lang', JSON.stringify(payload));
      localStorage.setItem('lang', payload);
      return {
        ...state,
        data: {
          ...state.data,
          ['lang']: payload,
        },
      };
    },
    setItem(state: LocalStorageState, { payload }: { payload: StorageData }) {
      localStorage.setItem(payload.key, JSON.stringify(payload.value));
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key]: payload.value,
        },
      };
    },

    removeItem(
      state: LocalStorageState,
      { payload }: { payload: { key: localStorageKey } },
    ) {
      localStorage.removeItem(payload.key);
      const { [payload.key]: removedItem, ...newData } = state.data;
      return {
        ...state,
        data: newData,
      };
    },

    clear(state: LocalStorageState) {
      localStorage.clear();
      return {
        ...state,
        data: {},
      };
    },
  },
};
