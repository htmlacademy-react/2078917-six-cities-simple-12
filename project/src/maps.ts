import { SortType } from './const';
import { Offer } from './types/offer';

export const SortTypeFunctionsMap = {
  [SortType.Popular]: () => 0,
  [SortType.PriceHigh]: (offer1: Offer, offer2: Offer) =>
    offer2.price - offer1.price,
  [SortType.PriceLow]: (offer1: Offer, offer2: Offer) =>
    offer1.price - offer2.price,
  [SortType.TopRated]: (offer1: Offer, offer2: Offer) =>
    offer2.rating - offer1.rating,
};
