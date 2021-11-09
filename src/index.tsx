import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './redux/store';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App'

render(
  <StrictMode>
    <CookiesProvider>
      <Provider {...{ store }}>
        <App />
      </Provider>
    </CookiesProvider>
  </StrictMode>,
  document.getElementById('root')
);