import { configureMockStore } from '@jedmao/redux-mock-store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import HistoryRouter from '../../components/history-router/history-router';
import {
  ApiRoute,
  AppRoute,
  AuthorizationStatus,
  NameSpace,
} from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';
import { getFakeComments, getFakeOffer, getFakeOffers } from '../../utils/mock';
import Room from './room';

const fakeStore = {
  dispatch(arg: ActionCreatorWithPayload<string | null, string>): void {
    // do nothing.
  },
};
jest.mock('../../store/index', () => fakeStore); // Stub action "setError" in interceptor.

const api = createAPI();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const offer = {
  ...getFakeOffer(),
  isPremium: true,
};
const comments = getFakeComments();
const nearbyOffers = getFakeOffers();

const history = createMemoryHistory();

const roomId = 1;

describe('Component: Room', () => {
  it('should render coorectly', () => {

    const store = mockStore({
      [NameSpace.Data]: {
        isOfferDataLoading: false,
        offer,
        comments,
        nearbyOffers,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    mockApi.onGet(ApiRoute.Offer).reply(200, offer);
    mockApi.onGet(ApiRoute.Comments).reply(200, comments);
    mockApi.onGet(ApiRoute.NearbyOffers).reply(200, nearbyOffers);

    history.push(AppRoute.Room.replace(':id', String(roomId)));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Room}
                element={<Room />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByTestId('premiumOffer')).toBeInTheDocument();
    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
    const featureItems = screen.getAllByTestId('featureItem');
    expect(featureItems.length).toEqual(offer.goods.length);
    expect(screen.getByTestId('hostAvatar')).toHaveAttribute('src', offer.host.avatarUrl);
  });

  it('should not render comment form if user is not authorized', () => {
    mockApi.onGet(ApiRoute.Offer).reply(200, offer);
    mockApi.onGet(ApiRoute.Comments).reply(200, []);
    mockApi.onGet(ApiRoute.NearbyOffers).reply(200, []);

    const store = mockStore({
      [NameSpace.Data]: {
        isOfferDataLoading: false,
        offer,
        comments: [],
        nearbyOffers: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    history.push(AppRoute.Room.replace(':id', String(roomId)));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Room}
                element={<Room />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.queryByText(/Other places in the neighbourhood/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Reviews ·/i)).not.toBeInTheDocument();
  });

  it('should not render comments and nearby offers if there are no of them', () => {
    mockApi.onGet(ApiRoute.Offer).reply(200, offer);
    mockApi.onGet(ApiRoute.Comments).reply(200, []);
    mockApi.onGet(ApiRoute.NearbyOffers).reply(200, []);

    const store = mockStore({
      [NameSpace.Data]: {
        isOfferDataLoading: false,
        offer,
        comments: [],
        nearbyOffers: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.Room.replace(':id', String(roomId)));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Room}
                element={<Room />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
  });

  it('should render not found page if offer id is invalid', () => {
    mockApi.onGet(ApiRoute.Offer).reply(200, offer);
    mockApi.onGet(ApiRoute.Comments).reply(200, []);
    mockApi.onGet(ApiRoute.NearbyOffers).reply(200, []);

    const store = mockStore({
      [NameSpace.Data]: {
        isOfferDataLoading: false,
        offer,
        comments: [],
        nearbyOffers: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.Room.replace(':id', 'fake'));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Room}
                element={<Room />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('should render loading page if offer is loading', () => {
    mockApi.onGet(ApiRoute.Offer).reply(200, offer);
    mockApi.onGet(ApiRoute.Comments).reply(200, []);
    mockApi.onGet(ApiRoute.NearbyOffers).reply(200, []);

    const store = mockStore({
      [NameSpace.Data]: {
        isOfferDataLoading: true,
        offer,
        comments: [],
        nearbyOffers: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.Room.replace(':id', String(roomId)));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Room}
                element={<Room />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('should render not found page if offer is undefined', () => {
    mockApi.onGet(ApiRoute.Offer).reply(200, offer);
    mockApi.onGet(ApiRoute.Comments).reply(200, []);
    mockApi.onGet(ApiRoute.NearbyOffers).reply(200, []);

    const store = mockStore({
      [NameSpace.Data]: {
        isOfferDataLoading: false,
        offer: undefined,
        comments: [],
        nearbyOffers: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.Room.replace(':id', String(roomId)));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Room}
                element={<Room />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Page not Found/i)).toBeInTheDocument();
  });
});
