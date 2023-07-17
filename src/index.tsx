import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './app/common.css';
import { App } from '@app/components/App/App';
import { store } from '@app/store';
import { NetworkStatusContextProvider } from '@features/networkStatus/networkStatusContextProvider';
import { initI18n } from '@features/locale/utils';
import * as Sentry from '@sentry/react';
import { Error } from '@components/Error/Error';

declare global {
  interface Window {
    SENTRY_RELEASE: string;
  }
}

if (window.SENTRY_RELEASE) {
  Sentry.init({
    dsn: 'https://b981402a811e4799a187c5838f340e8e@o4505536029655040.ingest.sentry.io/4505536042958848',
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
  // .then(() => console.log('sw register success'))
  // .catch(() => console.error('sw register error'));
}

/*class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    return this.state.error ? <Error /> : this.props.children;
  }
}*/

initI18n(() => {
  ReactDOM.render(
    <Sentry.ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <NetworkStatusContextProvider>
          <Router>
            <App />
          </Router>
        </NetworkStatusContextProvider>
      </Provider>
    </Sentry.ErrorBoundary>,
    document.getElementById('root')
  );
});
