import { AuthorizationStatus, cityNames, SortType } from '../const';
import { store } from '../store';
import { Review } from './comment';
import { Offer } from './offer';
import { AuthorizationInfo } from './user';

export type CityName = typeof cityNames[number];

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authorizationInfo: AuthorizationInfo | undefined;
};

export type DataProcess = {
  offers: Offer[];
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  offer: Offer | null;
  comments: Review[];
  nearbyOffers: Offer[];
  isCommentSending: boolean;
  isCommentSent: boolean;
};

export type AppProcess = {
  city: CityName;
  sortType: SortType;
  error: string | null;
};

export type State = ReturnType<typeof store.getState>;
