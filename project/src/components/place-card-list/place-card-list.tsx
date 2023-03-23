import { useState } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlaceCardListProps = {
  offers: Offer[];
};

export default function PlaceCardList({offers}: PlaceCardListProps): JSX.Element {
  const [activeCardId, setActiveCard] = useState(-1);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} />
        ))
      }
    </div>
  );
}
