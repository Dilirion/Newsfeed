import React, { useEffect } from 'react';
import { applyLocale, getSavedLocale } from '@features/locale/utils';
import { LocaleSwitcherValues } from '@features/locale/types';

export const useLocale = (): {
  locale: LocaleSwitcherValues;
  setLocale: React.Dispatch<LocaleSwitcherValues>;
} => {
  const [locale, setLocale] = React.useState<LocaleSwitcherValues>(getSavedLocale() || 'ru');

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return { locale, setLocale };
};
