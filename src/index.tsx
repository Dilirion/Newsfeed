import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './app/common.css';
import { initializeAPI } from '@app/api';
import { App } from '@app/components/App/App';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { store } from '@app/store';
const firebaseApp = initializeAPI();

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider firebaseApp={firebaseApp}>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);
