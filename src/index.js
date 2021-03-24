import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { GlobalStyles } from './styles';
import App from './components/App';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
