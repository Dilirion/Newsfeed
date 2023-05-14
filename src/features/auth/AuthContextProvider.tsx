import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { TAuthContext, TLoginWithEmailAndPasswordResult } from './types';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  User,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const authContext = createContext<TAuthContext>({
  isAuthenticate: null,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  loginWithPopup: () => Promise.reject({}),
  logOut: () => void 0,
});

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = getFirestore(firebaseApp);
  return await getDoc(doc(db, '/internal/auth'));
};

type TProps = {
  firebaseApp: FirebaseApp;
};

export const AuthContextProvider: FC<TProps> = ({ firebaseApp, children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<TAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithPopup = (provider: string) => {
    return processLogin(signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider]));
  };

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);

    auth.onAuthStateChanged((user) => {
      if (user) {
        isUserAdmin(firebaseApp)
          .then(() => {
            setIsAuthenticate(true);
            setUser(user);
          })
          .catch(() => {
            logOut();
            setIsAuthenticate(false);
            setUser(null);
          });
      } else {
        setIsAuthenticate(false);
        setUser(null);
      }
    });
  }, [auth]);

  const processLogin = (loginPromise: Promise<UserCredential>): Promise<TLoginWithEmailAndPasswordResult> => {
    setIsAuthenticate(null);
    setUser(null);
    return loginPromise
      .then((result) => {
        // todo log data
        return result;
      })
      .catch((error) => {
        //console.error('login error', error);
        throw error;
      });
  };

  const logOut = () => signOut(auth);
  return (
    <authContext.Provider value={{ isAuthenticate, user, loginWithEmailAndPassword, logOut, loginWithPopup }}>
      {children}
    </authContext.Provider>
  );
};
