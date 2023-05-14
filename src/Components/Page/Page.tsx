import React, { FC, Fragment, useState } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '@components/Logo/Logo';
import { ColorSchemeSwitcher } from '@components/ColorSchemeSwitcher/ColorSchemeSwitcher';
import { EmailModal } from '@components/EmailModal/EmailModal';

interface Props {
  children?: React.ReactNode;
}

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

export const Page: FC<Props> = ({ children }) => {
  const [emailModalShown, setEmailModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));
  return (
    <Fragment>
      {emailModalShown && (
        <EmailModal
          onClose={() => {
            localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
            setEmailModalShown(false);
          }}
        />
      )}
      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className="header__navigation" />
          <div className="header__controls">
            <ColorSchemeSwitcher />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <Logo />
            <Navigation className="footer__navigation" />
          </div>
          <div className="footer__bottom">
            Сделано на Frontend курсе в{' '}
            <a className="footer__link" href="https://karpov.courses/frontend" target="_blank" rel="noreferrer">
              Karpov.Courses
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
