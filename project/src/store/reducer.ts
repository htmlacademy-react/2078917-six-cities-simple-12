import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortType } from '../const';
import { Comment } from '../types/comment';
import { Offer } from '../types/offer';
import { CityName } from '../types/store';
import { AuthorizationInfo } from '../types/user';
import {
  changeCity,
  isCommentSending,
  isCommentSent,
  loadComments,
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  setAuthorizationInfo,
  setAuthorizationStatus,
  setError,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setSort,
} from './action';

const initialCity: CityName = 'Paris';

export type InitialState = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  authorizationInfo: AuthorizationInfo | undefined;
  error: string | null;
  offer: Offer | null;
  comments: Comment[];
  nearbyOffers: Offer[];
  isCommentSending: boolean;
  isCommentSent: boolean;
};

const initialState: InitialState = {
  city: initialCity,
  offers: [],
  sortType: SortType.Popular,
  isOffersDataLoading: true,
  isOfferDataLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationInfo: undefined,
  error: null,
  offer: null,
  comments: [],
  nearbyOffers: [],
  isCommentSending: false,
  isCommentSent: false
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setAuthorizationInfo, (state, action) => {
      state.authorizationInfo = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(isCommentSending, (state, action) => {
      state.isCommentSending = action.payload;
    })
    .addCase(isCommentSent, (state, action) => {
      state.isCommentSent = action.payload;
    });
});
