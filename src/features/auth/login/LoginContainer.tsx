import React, { FC, Reducer, useReducer, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ProviderId } from 'firebase/auth';
import { LoginForm, TLoginField } from '../components/LoginForm/LoginForm';
import './LoginContainer.css';
import { validateEmail } from './utils';
import { ALLOWED_OAUTH_PROVIDERS, useAuthContext } from '../AuthContextProvider';
import { Link, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';
import { TLoginWithEmailAndPasswordResult } from '../types';

type TLoginFieldState = Omit<TLoginField, 'onChange'>;
type TAction = {
  type: 'change' | 'error';
  value: string;
};

const getOauthProviderIcon = (provider: string) => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon fontSize="inherit" />;
    case ProviderId.GITHUB:
      return <GitHubIcon fontSize="inherit" />;
    default:
      return <LoginIcon fontSize="inherit" />;
  }
};

const reducer = (state: TLoginFieldState, action: TAction): TLoginFieldState => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        value: action.value,
        error: false,
      };
    case 'error':
      return {
        ...state,
        error: true,
        helper: action.value,
      };
  }
  return state;
};

export const LoginContainer: FC = () => {
  const { loginWithEmailAndPassword, loginWithPopup } = useAuthContext();
  const history = useHistory();
  const { state: locationState } = useLocation<{ from: string }>();
  const [authError, setAuthError] = useState('');

  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'email',
    value: '',
  });

  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'password',
    value: '',
  });

  const processLogin = (promise: Promise<TLoginWithEmailAndPasswordResult>): void => {
    promise
      .then(() => {
        history.push(locationState?.from || '/admin');
      })
      .catch((error) => {
        setAuthError(error.message || 'error');
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    if (!validateEmail(emailState.value)) {
      isValid = false;
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      });
    }
    if (passwordState.value.length <= 6) {
      isValid = false;
      dispatchEmail({
        type: 'error',
        value: 'Длина пароля должна быть боль 6 символов',
      });
    }

    if (isValid) {
      processLogin(loginWithEmailAndPassword(emailState.value, passwordState.value));
    }
  };

  const onOauthClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const dataset = (e.target as HTMLElement)?.closest<HTMLLinkElement>('.login-oauth-container__item')?.dataset;
    if (dataset?.providerid) {
      processLogin(loginWithPopup(dataset.providerid));
    }
  };
  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
          {authError}
        </Typography>
      )}
      <LoginForm
        email={{
          ...emailState,
          onChange: (e) => dispatchEmail({ type: 'change', value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) => dispatchPassword({ type: 'change', value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
      <div className="login-oauth-container">
        {Object.keys(ALLOWED_OAUTH_PROVIDERS).map((key) => (
          <Link key={key} onClick={onOauthClick} href="#" className="login-oauth-container__item" data-providerId={key}>
            {getOauthProviderIcon(key)}
          </Link>
        ))}
      </div>
    </div>
  );
};
