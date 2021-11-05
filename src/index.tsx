import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App'

render(
  <StrictMode>
    <Provider {...{store}}>
    <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);