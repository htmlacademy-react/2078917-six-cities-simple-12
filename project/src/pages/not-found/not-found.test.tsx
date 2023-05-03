import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import NotFound from './not-found';

describe('Component: NotFound', () => {

  it('should render coorectly', () => {

    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFound />
        </ HelmetProvider>
      </HistoryRouter>
    );

    const headerElement = screen.getByText('Page not Found');

    expect(headerElement).toBeInTheDocument();
  });
});
