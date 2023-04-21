import {configureMockStore} from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppRoute } from '../../const';
import { State } from '../../types/store';
import { redirectToRoute } from '../action';
import { redirect } from './redirect';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('history/browser', () => fakeHistory);

const middlewares = [redirect];

const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  it('should redirect to login',() => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Login)]);
  });
});
