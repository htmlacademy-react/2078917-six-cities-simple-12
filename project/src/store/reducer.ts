import { createReducer } from '@reduxjs/toolkit';
import { SortType } from '../const';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';
import {CityName} from '../types/store';
import { changeCity, loadOffers, setSort } from './action';

const initialCity: CityName = 'Paris';
const inirialOffers = offers.filter((o) => o.city.name === initialCity);

export type InitialState = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
};

const initialState: InitialState = {
  city: initialCity,
  offers: inirialOffers,
  sortType: SortType.Popular
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSort, (state, action)=> {
      state.sortType = action.payload;
    });
});
