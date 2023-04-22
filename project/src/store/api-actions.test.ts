import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../types/store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { ApiRoute } from '../const';
import { checkAuthorizationStatusAction, clearErrorAction, endSessionAction, fetchOffersAction, fetchRoomAction, getAuthorizationStatusAction, sendCommentAction } from './api-actions';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { getFakeAuthorizationInfo, getFakeComments, getFakeOffer, getFakeOffers, getFakeUserComment, getFakeUserCredentials } from '../utils/mock';
import { redirectToRoute } from './action';
import { AUTH_TOKEN_KEY_NAME } from '../services/token';

const fakeStore = {
  dispatch(arg: ActionCreatorWithPayload<string | null, string>): void {
    // do nothing.
  },
};
jest.mock('../store', () => fakeStore);// Stub action "setError" in interceptor.

const api = createAPI();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Async actions', () => {
  it('should set authorization info of payload when GET /login', async () => {

    const store = mockStore();
    const authorizationInfo = getFakeAuthorizationInfo();

    mockApi.onGet(ApiRoute.Login).reply(200, authorizationInfo);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthorizationStatusAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthorizationStatusAction.pending.type,
      checkAuthorizationStatusAction.fulfilled.type,
    ]);

  });

  it('should set token, authorization status to «auth» and authorization info to payload, dispatch redirectToRoute when POST /login', async () => {
    const store = mockStore();
    const authorizationInfo = getFakeAuthorizationInfo();
    const userCredentials = getFakeUserCredentials();

    Storage.prototype.setItem = jest.fn();

    mockApi.onPost(ApiRoute.Login).reply(200, authorizationInfo);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(getAuthorizationStatusAction(userCredentials));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getAuthorizationStatusAction.pending.type,
      redirectToRoute.type,
      getAuthorizationStatusAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(
      AUTH_TOKEN_KEY_NAME,
      authorizationInfo.token
    );
  });

  it('should set offers to payload when GET /hotels', async () => {
    const store = mockStore();
    const offers = getFakeOffers();

    mockApi.onGet(ApiRoute.Offers).reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should set comments, offer, nearby offers to payload when GET /hotels/{offerId}, GET /comments/{offerId}, GET /hotels/{offerId}/nearby', async () => {
    const store = mockStore();
    const offer = getFakeOffer();
    const comments = getFakeComments();
    const nearbyOffers = getFakeOffers();
    const offerId = 1;

    mockApi
      .onGet(ApiRoute.Offer.replace('{offerId', String(offerId)))
      .reply(200, offer);
    mockApi
      .onGet(ApiRoute.Comments.replace('{offerId', String(offerId)))
      .reply(200, comments);
    mockApi
      .onGet(ApiRoute.NearbyOffers.replace('{offerId', String(offerId)))
      .reply(200, nearbyOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchRoomAction(offerId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchRoomAction.pending.type,
      fetchRoomAction.fulfilled.type,
    ]);
  });

  it('should get comments when POST /comments/{offerId}', async () => {
    const store = mockStore();
    const comments = getFakeComments();
    const userComment = getFakeUserComment();
    const offerId = 1;

    mockApi
      .onPost(ApiRoute.Comments.replace('{offerId}', String(offerId)))
      .reply(200, comments);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendCommentAction({...userComment, offerId}));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      sendCommentAction.fulfilled.type,
    ]);
  });

  it('should delete token when GET /Logout', async () => {
    const store = mockStore();

    mockApi.onDelete(ApiRoute.Logout).reply(204);
    expect(store.getActions()).toEqual([]);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(endSessionAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      endSessionAction.pending.type,
      endSessionAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);

  });

  it('should clear error when clearErrorAction', async () => {
    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(clearErrorAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      clearErrorAction.pending.type,
      clearErrorAction.fulfilled.type,
    ]);

  });

});
