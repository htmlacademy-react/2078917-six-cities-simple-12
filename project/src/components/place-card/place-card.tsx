import { Link } from 'react-router-dom';
import { OfferCardType } from '../../const';
import { Offer } from '../../types/offer';
import { getPercentByRating } from '../../utils';
import cn from 'classnames';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  cardType: OfferCardType;
};

export default function PlaceCard({
  offer,
  onMouseEnter,
  onMouseLeave,
  cardType,
}: PlaceCardProps): JSX.Element {
  const { isPremium, id, previewImage, price, rating, title, type } = offer;

  const premiumMarkElement = (
    <div className='place-card__mark'>
      <span>&quot;Premium&quot;</span>
    </div>
  );
  return (
    <article
      className={cn(
        'place-card',
        { 'cities__card': cardType === OfferCardType.Offer },
        { 'near-places__card': cardType === OfferCardType.NearByOffer }
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && premiumMarkElement}
      <div
        className={cn(
          'place-card__image-wrapper',
          { 'cities__image-wrapper': cardType === OfferCardType.Offer },
          {
            'near-places__image-wrapper':
              cardType === OfferCardType.NearByOffer,
          }
        )}
      >
        <Link to={`/offer/${id}`}>
          <img
            className='place-card__image'
            src={previewImage}
            width='260'
            height='200'
            alt='Place'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: getPercentByRating(rating) }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='/'>{title}</a>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}
