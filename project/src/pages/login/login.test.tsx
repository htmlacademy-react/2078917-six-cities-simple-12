import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import Login from './login';

const mockStore = configureMockStore();

describe('Component: Login', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByTestId('login'), 'email@mail.com');
      await userEvent.type(screen.getByTestId('password'), '1q');
    }
    );

    expect(screen.getByDisplayValue(/email@mail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1q/)).toBeInTheDocument();

  });
});
