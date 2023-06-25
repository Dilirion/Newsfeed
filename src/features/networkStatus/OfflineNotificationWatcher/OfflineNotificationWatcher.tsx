import React, { FC } from 'react';
import { useNetworkStatusContext } from '@features/networkStatus/networkStatusContextProvider';
import { OfflineNotification } from '@components/OfflineNotification/OfflineNotification';
import { CSSTransition } from 'react-transition-group';
import './OfflineNotificationWatcher.css';

export const OfflineNotificationWatcher: FC = () => {
  const { online } = useNetworkStatusContext();
  return (
    <CSSTransition in={!online} mountOnEnter unmountOnExit timeout={300} classNames="offline-notification-animation">
      <OfflineNotification />
    </CSSTransition>
  );
};
