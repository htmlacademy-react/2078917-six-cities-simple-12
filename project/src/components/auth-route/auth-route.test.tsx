import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import HistoryRouter from '../history-router/history-router';
import AuthRoute from './auth-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: AuthRoute', () => {
  it('should render "Main" page if authenticationStatus = AUTH', () => {

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Root}
                element={<h1>Main page</h1>}
              >
              </Route>
              <Route
                path={AppRoute.Login}
                element={
                  <AuthRoute>
                    <h1>Login page</h1>
                  </AuthRoute>
                }
              >
              </Route>
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should render "Login" page if authenticationStatus != AUTH', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Root}
                element={<h1>Main page</h1>}
              >
              </Route>
              <Route
                path={AppRoute.Login}
                element={
                  <AuthRoute>
                    <h1>Login page</h1>
                  </AuthRoute>
                }
              >
              </Route>
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
