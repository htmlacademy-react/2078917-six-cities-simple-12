import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import { OfferCardType } from '../../const';
import { getFakeOffers } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import PlaceCardList from './place-card-list';

const history = createMemoryHistory();

const offers = getFakeOffers();

describe('Component: PlaceCardList', () => {
  it('should render correctly offer cards', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='*'
            element={
              <PlaceCardList
                offers={offers}
                onOfferHover={jest.fn()}
                onOfferLeave={jest.fn()}
                cardType={OfferCardType.Offer}
              />
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByTestId('placeCardList')).toHaveClass(
      'cities__places-list'
    );
    expect(screen.getByTestId('placeCardList')).not.toHaveClass(
      'near-places__list'
    );
    expect(screen.getByTestId('placeCardList')).toHaveClass(
      'tabs__content'
    );
    const placeCards = screen.getAllByRole('article');
    expect(placeCards.length).toBe(offers.length);
  });

  it('should render correctly nearby offer cards', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='*'
            element={
              <PlaceCardList
                offers={offers}
                onOfferHover={jest.fn()}
                onOfferLeave={jest.fn()}
                cardType={OfferCardType.NearByOffer}
              />
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByTestId('placeCardList')).not.toHaveClass(
      'cities__places-list'
    );
    expect(screen.getByTestId('placeCardList')).toHaveClass(
      'near-places__list'
    );
    expect(screen.getByTestId('placeCardList')).not.toHaveClass(
      'tabs__content'
    );
    const placeCards = screen.getAllByRole('article');
    expect(placeCards.length).toBe(offers.length);
  });
});
