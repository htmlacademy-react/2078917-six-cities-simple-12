import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {
  AppRoute,
  AuthorizationStatus,
  NameSpace,
  SortType,
} from '../../const';
import {
  getFakeComments,
  getFakeOffer,
  getFakeOffers,
} from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const offers = getFakeOffers();
const offer = getFakeOffer();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    authorizationInfo: undefined,
  },
  [NameSpace.Data]: {
    offers,
    isOffersDataLoading: false,
    isOfferDataLoading: false,
    offer,
    comments: getFakeComments(),
    nearbyOffers: getFakeOffers(),
    isCommentSending: false,
    isCommentSent: true,
  },
  [NameSpace.App]: {
    city: 'Paris',
    sortType: SortType.Popular,
    error: null,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application routing', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render "Main" page when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render "Room" page when user navigate to "/offer/:id"', () => {
    const roomId = offer.id;
    history.push(AppRoute.Room.replace(':id', String(roomId)));

    render(fakeApp);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "Login: page when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByTestId('sign-in')).toHaveTextContent('Sign in');
    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });

  it('should render "NotFound" page when user navigate to non-existent route', () => {
    history.push('/fakeRoute');

    render(fakeApp);

    expect(screen.getByText(/Page not Found/i)).toBeInTheDocument();
  });
});
