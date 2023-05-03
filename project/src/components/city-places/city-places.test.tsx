import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { NameSpace, SortType } from '../../const';
import { CityName } from '../../types/store';
import { getFakeOffers } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import CityPlaces from './city-places';

describe('Component: CityPlaces', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();
  const store = mockStore({
    [NameSpace.App]: SortType.PriceHigh,
  });
  const offers = getFakeOffers();
  const cityName: CityName = 'Paris';
  const offersInCity = offers.filter((offer) => offer.city.name === cityName);

  it('should render coorectly', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='*'
              element={
                <CityPlaces
                  offers={offersInCity}
                  currentCity={cityName}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(new RegExp(`${offersInCity.length} places to stay in ${cityName}`, 'i'))
    ).toBeInTheDocument();
  });
});
