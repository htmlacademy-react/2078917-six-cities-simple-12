import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortType } from '../const';
import { Offer } from '../types/offer';
import { CityName } from '../types/store';
import { AuthorizationInfo } from '../types/user';
import {
  changeCity,
  loadOffers,
  setAuthorizationInfo,
  setAuthorizationStatus,
  setError,
  setOffersDataLoadingStatus,
  setSort,
} from './action';

const initialCity: CityName = 'Paris';

export type InitialState = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  authorizationInfo: AuthorizationInfo | undefined;
  error: string | null;
};

const initialState: InitialState = {
  city: initialCity,
  offers: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationInfo: undefined,
  error: null
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setAuthorizationInfo, (state, action) => {
      state.authorizationInfo = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
