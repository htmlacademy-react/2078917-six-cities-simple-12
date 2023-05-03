import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace } from '../../const';
import { getFakeAuthorizationInfo } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: Header', () => {

  it('should render correctly', () => {
    const userInfo = getFakeAuthorizationInfo();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationInfo: userInfo,
      },
    });

    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='*'
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${userInfo.email}`, 'i'))
    ).toBeInTheDocument();
  });

  it('should redirect to "Login" page when user click to "Sign in"', async () => {

    const store = mockStore({
      [NameSpace.User]: {
        authorizationInfo: undefined,
      },
    });

    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Login page</h1>}
            />
            <Route
              path='*'
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('signIn'));
    });

    expect(screen.getByText(/Login page/i)).toBeInTheDocument();
  });

  it('should call end session action when user click to "Sign out"', async () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationInfo: getFakeAuthorizationInfo(),
      },
    });

    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='*'
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('signOut'));
    });

    const actions = store.getActions();
    expect(actions[0].type).toBe('data/endSession/pending');
  });
});
