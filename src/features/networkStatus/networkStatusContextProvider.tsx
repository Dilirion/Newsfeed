import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { TNetworkStatusContext } from '@features/networkStatus/types';

const context = createContext<TNetworkStatusContext>({
  online: true,
});

export const useNetworkStatusContext = (): TNetworkStatusContext => {
  return useContext(context);
};

export const NetworkStatusContextProvider: FC = ({ children }) => {
  const [online, setOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
  }, []);
  return <context.Provider value={{ online: online }}>{children}</context.Provider>;
};
