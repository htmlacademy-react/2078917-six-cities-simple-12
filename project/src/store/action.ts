import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SortType } from '../const';
import { Comment } from '../types/comment';
import { Offer } from '../types/offer';
import { CityName } from '../types/store';
import { AuthorizationInfo } from '../types/user';

export const changeCity = createAction<CityName>('city/change');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setSort = createAction<SortType>('data/setSort');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const loadComments = createAction<Comment[]>('data/loadComments');

export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('user/setOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>(
  'user/setOfferDataLoadingStatus'
);

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setAuthorizationInfo = createAction <AuthorizationInfo | undefined>('user/setInfo');

export const setError = createAction<string | null>('app/setError');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const isCommentSending = createAction<boolean>('app/setCommentSending');

export const isCommentSent = createAction<boolean>('app/setCommentSent');
