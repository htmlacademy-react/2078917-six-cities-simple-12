import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../types/store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { ApiRoute } from '../const';
import { checkAuthorizationStatusAction } from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();

    mockApi.onGet(ApiRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthorizationStatusAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthorizationStatusAction.pending.type,
      checkAuthorizationStatusAction.fulfilled.type
    ]);
  });

});

