import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SortType } from '../const';
import { Offer } from '../types/offer';
import { CityName } from '../types/store';
import { AuthorizationInfo } from '../types/user';

export const changeCity = createAction<CityName>('city/change');

export const loadOffers = createAction<Offer[]>('offers/load');

export const setSort = createAction<SortType>('offers/setSort');

export const setOffersDataLoadingStatus = createAction<boolean>('offers/loadingStatus');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setAuthorizationInfo = createAction <AuthorizationInfo | undefined>('user/setInfo');

export const setError = createAction<string | null>('app/setError');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
