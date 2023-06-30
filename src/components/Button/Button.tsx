import React, { ButtonHTMLAttributes, FC } from 'react';
import './Button.css';
import { useTranslation } from 'react-i18next';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, loading = false, onClick, ...restProps }: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <button {...restProps} className="button" onClick={loading ? undefined : onClick}>
      {children}
      {loading && (
        <span className="button__loading">
          <img className="button__spinner" src={require('../../images/spinner.svg')} alt={t('button_spinner')} />
        </span>
      )}
    </button>
  );
};
