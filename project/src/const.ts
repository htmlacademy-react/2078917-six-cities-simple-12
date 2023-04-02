export enum AppRoute {
  Root = '/',
  Login = 'login',
  Room = 'offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const CommentStarTitle = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

export const MIN_CHARACTERS_IN_COMMENT = 50;

export const MAX_CHARACTERS_IN_COMMENT = 300;

export const RATING_STARS_NUMBER = 5;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export enum OfferCardType {
  Offer = 'Offer',
  NearByOffer = 'NearByOffer'
}
