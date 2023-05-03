import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import { AppRoute, OfferCardType } from '../../const';
import { getFakeOffer } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import PlaceCard from './place-card';

const history = createMemoryHistory();

const offer = {
  ...getFakeOffer(),
  isPremium: true,
};

const onMouseEnter = jest.fn();
const onMouseLeave = jest.fn();

const fakeComponent = (
  <HistoryRouter history={history}>
    <Routes>
      <Route
        path={AppRoute.Room}
        element={<h1>Room page</h1>}
      />
      <Route
        path='*'
        element={
          <PlaceCard
            offer={offer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            cardType={OfferCardType.Offer}
          />
        }
      />
    </Routes>
  </HistoryRouter>
);

describe('Component: PlaceCard', () => {

  it('should render offer card correctly', () => {
    history.push('/fake');

    render(fakeComponent);

    expect(screen.getByRole('article')).toHaveClass('cities__card');
    expect(screen.getByTestId('imageWrapper')).toHaveClass(
      'cities__image-wrapper'
    );
    expect(screen.getByTestId('imageWrapper')).not.toHaveClass(
      'near-places__image-wrapper'
    );
    expect(screen.getByText(new RegExp(`${offer.type}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${offer.title}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/premium/i)).toBeInTheDocument();
  });

  it('should redirect to "Room" page when user click to card image', async () => {
    history.push('/fake');

    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('toRoomFromImage'));
    });

    expect(screen.getByText(/Room page/i)).toBeInTheDocument();
  });

  it('should redirect to "Room" page when user click to card title', async () => {
    history.push('/fake');

    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('toRoomFromTitle'));
    });

    expect(screen.getByText(/Room page/i)).toBeInTheDocument();
  });

  it('onMouseEnter/onMouseLeave should be called when user hover/leave the card', async () => {
    history.push('/fake');

    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.hover(screen.getByRole('article'));
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.unhover(screen.getByRole('article'));
    });

    expect(onMouseEnter).toBeCalled();
    expect(onMouseLeave).toBeCalled();

    expect(onMouseEnter).toBeCalledTimes(1);
    expect(onMouseLeave).toBeCalledTimes(1);
  });
});
