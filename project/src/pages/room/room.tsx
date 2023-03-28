import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/comment-form/comment-form';
import Header from '../../components/header/header';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import { CommentForOffer } from '../../types/comment';
import { Offer } from '../../types/offer';
import {
  getPercentByRating,
  getTitleApartmentByType,
  makeWordPluralOrSingular,
} from '../../utils';
import NotFound from '../not-found/not-found';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { CardType } from '../../const';
import { useState } from 'react';

type RoomProps = {
  offers: Offer[];
  offersComments: CommentForOffer[];
  nearbyOffers: Offer[];
};

export default function Room({
  offers,
  offersComments,
  nearbyOffers,
}: RoomProps): JSX.Element {

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const { id: idParam } = useParams();
  const regexp = new RegExp(/^[0-9]+$/);

  if (!regexp.test(String(idParam))) {
    return <NotFound />;
  }
  const id = Number(idParam);

  const offer = offers.find((o) => o.id === id);

  if (!offer) {
    return <NotFound />;
  }

  const commentsForOffer = offersComments.find(
    (c) => c.offerId === id
  )?.commentsForOffer;

  const {
    type,
    images,
    isPremium,
    title,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = offer;

  return (
    <>
      <Helmet>
        <title>{getTitleApartmentByType(type)}</title>
      </Helmet>
      <Header userInfo={undefined} />
      <main className='page__main page__main--property'>
        <section className='property'>
          {images.length > 0 && (
            <div className='property__gallery-container container'>
              <div className='property__gallery'>
                {images.map((imageScr) => (
                  <div
                    key={imageScr}
                    className='property__image-wrapper'
                  >
                    <img
                      className='property__image'
                      src={imageScr}
                      alt='Photostudio'
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className='property__container container'>
            <div className='property__wrapper'>
              {isPremium && (
                <div className='property__mark'>
                  <span>Premium</span>
                </div>
              )}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>{title}</h1>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{ width: getPercentByRating(rating) }}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>
                  {rating}
                </span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>
                  {getTitleApartmentByType(type)}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {`${bedrooms} ${makeWordPluralOrSingular(
                    bedrooms,
                    'Bedroom',
                    'Bedrooms'
                  )}`}
                </li>
                <li className='property__feature property__feature--adults'>
                  {`Max ${maxAdults} ${makeWordPluralOrSingular(
                    maxAdults,
                    'adult',
                    'adults'
                  )}`}
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {goods.map((good) => (
                    <li
                      key={good}
                      className='property__inside-item'
                    >
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                    <img
                      className='property__avatar user__avatar'
                      src={host.avatarUrl}
                      width='74'
                      height='74'
                      alt='Host avatar'
                    />
                  </div>
                  <span className='property__user-name'>{host.name}</span>
                  {host.isPro && (
                    <span className='property__user-status'>Pro</span>
                  )}
                </div>
                <div className='property__description'>
                  <p className='property__text'>{description}</p>
                </div>
              </div>
              {commentsForOffer && (
                <ReviewList comments={commentsForOffer}>
                  <CommentForm />
                </ReviewList>
              )}
            </div>
          </div>
          <section className='property__map map'>
            <Map
              city={
                nearbyOffers.length !== 0 ? nearbyOffers[0].city : undefined
              }
              points={nearbyOffers.map((o) => o.location)}
              selectedPoint={selectedOffer?.location}
            />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <PlaceCardList
              offers={nearbyOffers}
              onOfferHover={(nearbyOffer: Offer) => setSelectedOffer(nearbyOffer)}
              onOfferLeave={() => setSelectedOffer(undefined)}
              cardType={CardType.NearByOffer}
            />
          </section>
        </div>
      </main>
    </>
  );
}
