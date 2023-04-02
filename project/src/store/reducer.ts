import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';
import {CityName} from '../types/store';
import { changeCity, loadOffers } from './action';

const initialCity: CityName = 'Paris';
const inirialOffers = offers.filter((o) => o.city.name === initialCity);

export type InitialState = {
  city: CityName;
  offers: Offer[];
};

const initialState: InitialState = {
  city: initialCity,
  offers: inirialOffers,
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
