import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { categoryTitles } from '../../utils';
import classNames from 'classnames';

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
  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation__list">
        <NavigationItem title="Новости" />
        {Object.entries(categoryTitles).map(([name, title]) => {
          return <NavigationItem key={name} name={name} title={title} />;
        })}
      </ul>
    </nav>
  );
};
