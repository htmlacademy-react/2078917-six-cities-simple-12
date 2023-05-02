import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import HistoryRouter from '../history-router/history-router';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should redirect to home page', async () => {
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/'
            element={<h1>Main page</h1>}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('toHome'));
    });

    expect(screen.getByText(/Main page/i)).toBeInTheDocument();
  });
});
