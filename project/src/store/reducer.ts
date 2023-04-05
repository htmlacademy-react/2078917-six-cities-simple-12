import { createReducer } from '@reduxjs/toolkit';
import { SortType } from '../const';
import { Offer } from '../types/offer';
import { CityName } from '../types/store';
import {
  changeCity,
  loadOffers,
  setOffersDataLoadingStatus,
  setSort,
} from './action';

const initialCity: CityName = 'Paris';

export type InitialState = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  city: initialCity,
  offers: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
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
    });
});
