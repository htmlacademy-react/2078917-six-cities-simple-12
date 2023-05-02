import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {
  NameSpace,
  SortType,
} from '../../const';
import { CityName } from '../../types/store';
import { getFakeAuthorizationInfo, getFakeOffers } from '../../utils/mock';
import Main from './main';

const mockStore = configureMockStore();

const city: CityName = 'Cologne';
const offers = getFakeOffers();
const sortType: SortType = SortType.PriceHigh;

const history = createMemoryHistory();

describe('Component: Room', () => {
  it('should render correctly', () => {

    const store = mockStore({
      [NameSpace.Data]: {
        isOffersDataLoading: false,
        offers,
      },
      [NameSpace.App]: {
        city,
        sortType,
      },
      [NameSpace.User]: {
        getAuthorizationInfo: getFakeAuthorizationInfo()
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );


    expect(screen.getByTestId('mainContainer')).not.toHaveClass(
      'page__main--index-empty'
    );
  });

  it('should put class if offers is empty', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isOffersDataLoading: false,
        offers: [],
      },
      [NameSpace.App]: {
        city,
        sortType,
      },
      [NameSpace.User]: {
        getAuthorizationInfo: getFakeAuthorizationInfo(),
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('mainContainer')).toHaveClass(
      'page__main--index-empty'
    );
  });

  it('should render loading page if offers are loading', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isOffersDataLoading: true,
        offers: [],
      },
      [NameSpace.App]: {
        city,
        sortType,
      },
      [NameSpace.User]: {
        getAuthorizationInfo: getFakeAuthorizationInfo(),
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('should render NoPlaceAvailable page if offers are empty', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isOffersDataLoading: false,
        offers: [],
      },
      [NameSpace.App]: {
        city,
        sortType,
      },
      [NameSpace.User]: {
        getAuthorizationInfo: getFakeAuthorizationInfo(),
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${city}`, 'i'))).toBeInTheDocument();
  });

});
