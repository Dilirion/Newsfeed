import React, { FC, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Page.css';
import { Navigation } from '@components/Navigation/Navigation';
import { Logo } from '@components/Logo/Logo';
import { EmailModal } from '@features/subscribeNotification/components/EmailModal/EmailModal';
import { ColorSchemeSwitcher } from '@features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcher';
import { Dispatch } from '@app/store';
import { fetchCategories } from '@features/categories/actions';
import { fetchSources } from '@features/sources/actions';

interface Props {
  children?: React.ReactNode;
}

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

export const Page: FC<Props> = ({ children }) => {
  const dispatch = useDispatch<Dispatch>();
  const [emailModalShown, setEmailModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSources());
  }, []);

  return (
    <Fragment>
      <EmailModal
        shown={emailModalShown}
        onClose={() => {
          localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
          setEmailModalShown(false);
        }}
      />

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
