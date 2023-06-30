import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import './Navigation.css';
import { CategoryNames } from '@features/categories/types';

interface Props {
  className?: string;
}

interface NavigationItemProps {
  title?: string;
  name?: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ title, name = '' }) => {
  return (
    <li className="navigation__item" key={name}>
      <NavLink
        to={`/${name}`}
        activeClassName={'navigation__link--active'}
        className={'navigation__link'}
        isActive={(match) => match?.isExact || false}
      >
        {title}
      </NavLink>
    </li>
  );
};

export const Navigation: FC<Props> = ({ className = '' }) => {
  const { t } = useTranslation();

  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation__list">
        <NavigationItem title={t('category_news')} />
        {Object.values(CategoryNames)
          .slice(0, 5)
          .map((name) => {
            return <NavigationItem key={name} name={name} title={t(`category_${name}`)} />;
          })}
      </ul>
    </nav>
  );
};
