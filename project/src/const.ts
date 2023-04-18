import { CityName } from './types/store';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Offer = '/hotels/{offerId}',
  Comments = '/comments/{offerId}',
  NearbyOffers = '/hotels/{offerId}/nearby',
}

export const CommentStarTitle = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

export const MIN_CHARACTERS_IN_COMMENT = 50;

export const MAX_CHARACTERS_IN_COMMENT = 300;

export const RATING_STARS_NUMBER = 5;

export const TIMEOUT_SHOW_ERROR = 2000;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const initialCity: CityName = 'Paris';

export enum OfferCardType {
  Offer = 'Offer',
  NearByOffer = 'NearByOffer'
}

export enum SortType {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  TopRated = 'Top rated first'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  App = 'APP'
}
