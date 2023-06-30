import React, { ForwardedRef, forwardRef } from 'react';
import './ColorSchemeSwitcherButton.css';
import { Auto } from '@components/Icons/Auto';
import { Moon } from '@components/Icons/Moon';
import { Sun } from '@components/Icons/Sun';
import { ColorSchemeSwitcherValues } from '@features/colorScheme/types';
import { useTranslation } from 'react-i18next';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  scheme: ColorSchemeSwitcherValues;
}

export const ColorSchemeSwitcherButton = forwardRef(function ColorSchemeSwitcherButton(
  { onClick, scheme }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { t } = useTranslation();
  return (
    <button
      aria-label={t('color_scheme_button_change')}
      className="color-scheme-switcher-button"
      ref={ref}
      onClick={onClick}
    >
      {scheme === 'auto' && <Auto />}
      {scheme === 'dark' && <Moon />}
      {scheme === 'light' && <Sun />}
    </button>
  );
});
