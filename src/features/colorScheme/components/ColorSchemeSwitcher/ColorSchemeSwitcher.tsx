import React, { FC, useEffect, useRef, useState } from 'react';
import './ColorSchemeSwitcher.css';
import { applyScheme, getSavedScheme, getSystemScheme, removeSavedScheme } from '../../colorSchemeUtils';
import { Auto } from '@components/Icons/Auto';
import { Sun } from '@components/Icons/Sun';
import { Moon } from '@components/Icons/Moon';
import { Dropdown } from '@components/Dropdown/Dropdown';

type ColorSchemeSwitcherValues = 'auto' | 'dark' | 'light';

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');

export const ColorSchemeSwitcher: FC = () => {
  const [userScheme, setUserScheme] = React.useState<ColorSchemeSwitcherValues>(getSavedScheme() || 'auto');
  const [dropdownShown, setDropdownShown] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (userScheme === 'auto') {
      removeSavedScheme();
      applyScheme(getSystemScheme());
    } else {
      applyScheme(userScheme, true);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorSchemeListener = () => {
      if (userScheme === 'auto') {
        applyScheme(getSystemScheme());
      }
    };
    matchMedia.addEventListener('change', systemColorSchemeListener);

    return () => {
      matchMedia.removeEventListener('change', systemColorSchemeListener);
    };
  }, [userScheme]);

  return (
    <div className="color-scheme-switcher">
      <button
        className="color-scheme-switcher__value"
        ref={targetRef}
        onClick={() => {
          setDropdownShown(!dropdownShown);
        }}
      >
        {userScheme === 'auto' && <Auto />}
        {userScheme === 'light' && <Sun />}
        {userScheme === 'dark' && <Moon />}
      </button>
      <Dropdown targetRef={targetRef} shown={dropdownShown} onShownChange={setDropdownShown}>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('auto')}>
          <Auto />
          <span className="color-scheme-switcher__text">Авто</span>
          {userScheme === 'auto' && (
            <img
              className="color-scheme-switcher__check"
              src={require('../../../../images/check.svg')}
              alt="Выбранная тема"
            />
          )}
        </button>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('light')}>
          <Sun />
          <span className="color-scheme-switcher__text">Светлая</span>
          {userScheme === 'light' && (
            <img
              className="color-scheme-switcher__check"
              src={require('../../../../images/check.svg')}
              alt="Выбранная тема"
            />
          )}
        </button>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('dark')}>
          <Moon />
          <span className="color-scheme-switcher__text">Темная</span>
          {userScheme === 'dark' && (
            <img
              className="color-scheme-switcher__check"
              src={require('../../../../images/check.svg')}
              alt="Выбранная тема"
            />
          )}
        </button>
      </Dropdown>
    </div>
  );
};
