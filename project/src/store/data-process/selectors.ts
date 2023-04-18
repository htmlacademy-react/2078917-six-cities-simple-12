import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getOffers = (state: State) => state[NameSpace.Data].offers;
export const getOffer = (state: State) => state[NameSpace.Data].offer;
export const getComments = (state: State) => state[NameSpace.Data].comments;
export const getNearbyOffers = (state: State) => state[NameSpace.Data].nearbyOffers;
export const getIsOffersDataLoading = (state: State) => state[NameSpace.Data].isOffersDataLoading;
export const getIsOfferDataLoading = (state: State) => state[NameSpace.Data].isOfferDataLoading;
export const getIsCommentSending = (state: State) => state[NameSpace.Data].isCommentSending;
export const getIsCommentSent = (state: State) => state[NameSpace.Data].isCommentSent;
