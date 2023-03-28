import { CardType } from '../../const';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import cn from 'classnames';

type PlaceCardListProps = {
  offers: Offer[];
  onOfferHover: (offer: Offer) => void;
  onOfferLeave: () => void;
  cardType: CardType;
};

export default function PlaceCardList({
  offers,
  onOfferHover,
  onOfferLeave,
  cardType,
}: PlaceCardListProps): JSX.Element {
  return (
    <div
      className={cn(
        'places__list',
        { 'cities__places-list': cardType === CardType.Offer },
        { 'near-places__list': cardType === CardType.NearByOffer },
        { 'tabs__content': cardType === CardType.Offer }
      )}
    >
      {offers.map((offer) => (
        <PlaceCard
          key={`card-item-${offer.id}`}
          offer={offer}
          onMouseEnter={() => onOfferHover(offer)}
          onMouseLeave={onOfferLeave}
          cardType={cardType}
        />
      ))}
    </div>
  );
}
