import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
import { getAuth, User, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';

const authContext = createContext<TAuthContext>({
  isAuthenticate: null,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
});

export const useAuth = (): TAuthContext => useContext(authContext);

type TProps = {
  firebaseApp: FirebaseApp;
};

export const AuthContextProvider: FC<TProps> = ({ firebaseApp, children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<TAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));

  const loginWithEmailAndPassword = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // todo log data
        return result;
      })
      .catch((error) => {
        console.error('login error', error);
        throw error;
      });

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticate(true);
        setUser(user);
      } else {
        setIsAuthenticate(false);
        setUser(null);
      }
    });
  }, [auth]);
  return (
    <authContext.Provider value={{ isAuthenticate, user, loginWithEmailAndPassword }}>{children}</authContext.Provider>
  );
};
