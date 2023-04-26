import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './common.css';
import { initializeAPI } from './api';
import { App } from './Components/App/App';

initializeAPI();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
