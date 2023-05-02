import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeComments, getFakeOffers } from '../utils/mock';
import useGetRoom from './use-get-room';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

const fakeStore = {
  dispatch(arg: ActionCreatorWithPayload<string | null, string>): void {
    // do nothing.
  },
};
jest.mock('../store/index', () => fakeStore);// Stub action "setError" in interceptor.

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Hook: useGetRoom', () => {
  it('should call action when given id is number', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: getFakeOffers(),
        nearbyOffers: getFakeOffers(),
        comments: getFakeComments()
      },
    });

    const offerId = 1;

    renderHook(
      () => useGetRoom(offerId),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchRoom/pending');
  });

  it('should return offers, comments, nearbyOffers if given offer id is number', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: getFakeOffers(),
        nearbyOffers: getFakeOffers(),
        comments: getFakeComments(),
      },
    });

    const offerId = 1;

    const { result } = renderHook(() => useGetRoom(offerId), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const [offers, comments, nearbyOffers] = result.current;
    expect(offers).toStrictEqual(offers);
    expect(comments).toStrictEqual(comments);
    expect(nearbyOffers).toStrictEqual(nearbyOffers);

  });

  it('should not call action when given id is NaN', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: getFakeOffers(),
        nearbyOffers: getFakeOffers(),
        comments: getFakeComments(),
      },
    });

    const offerId = NaN;

    renderHook(() => useGetRoom(offerId), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions.length).toBe(0);
  });

});
