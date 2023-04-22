import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  checkAuthorizationStatusAction,
  fetchOffersAction,
} from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthorizationStatusAction());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <ErrorMessage />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
