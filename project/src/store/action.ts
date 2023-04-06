import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';
import { Offer } from '../types/offer';
import { CityName } from '../types/store';

export const changeCity = createAction<CityName>('city/change');

export const loadOffers = createAction<Offer[]>('offers/load');

export const setSort = createAction<SortType>('offers/setSort');

export const setOffersDataLoadingStatus = createAction<boolean>('offers/loadingStatus');
