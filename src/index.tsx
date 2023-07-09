import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './app/common.css';
import { App } from '@app/components/App/App';
import { store } from '@app/store';
import { NetworkStatusContextProvider } from '@features/networkStatus/networkStatusContextProvider';
import { initI18n } from '@features/locale/utils';

/*if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
  // .then(() => console.log('sw register success'))
  // .catch(() => console.error('sw register error'));
}*/

initI18n(() => {
  ReactDOM.render(
    <Provider store={store}>
      <NetworkStatusContextProvider>
        <Router>
          <App />
        </Router>
      </NetworkStatusContextProvider>
    </Provider>,
    document.getElementById('root')
  );
});
