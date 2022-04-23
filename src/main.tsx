import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'redux/store';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer!);

root.render(
  <StrictMode>
    <Provider {...{ store }}>
      <App />
    </Provider>
  </StrictMode>
);
