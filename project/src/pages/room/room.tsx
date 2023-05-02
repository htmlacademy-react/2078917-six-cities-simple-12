import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/comment-form/comment-form';
import Header from '../../components/header/header';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import {
  getPercentByRating,
  getTitleApartmentByType,
  makeWordPluralOrSingular,
} from '../../utils';
import NotFound from '../not-found/not-found';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { AuthorizationStatus, OfferCardType } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import Loading from '../loading/loading';
import { getIsOfferDataLoading } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import useGetRoom from '../../hooks/use-get-room';

export default function Room(): JSX.Element {
  const { id: idAsString } = useParams();
  const id = Number(idAsString);

  const [offer, commentsForOffer, nearbyOffers] = useGetRoom(id);
  const isLoading = useAppSelector(getIsOfferDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isNaN(id)) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!offer) {
    return <NotFound />;
  }

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
    location,
  } = offer;

  const premiumMarkElement = (
    <div className='property__mark'>
      <span data-testid='premiumOffer'>Premium</span>
    </div>
  );

  const nearbyOffersElement = (
    <div className='container'>
      <section className='near-places places'>
        <h2 className='near-places__title'>
          Other places in the neighbourhood
        </h2>
        <PlaceCardList
          offers={nearbyOffers}
          cardType={OfferCardType.NearByOffer}
        />
      </section>
    </div>
  );

  const mapOffers = nearbyOffers.concat(offer);
  const mapPoints = mapOffers.map((o) => o.location);
  const mapCity = mapOffers.find((o) => o.city)?.city;

  return (
    <div className='page'>
      <Helmet>
        <title>{getTitleApartmentByType(type)}</title>
      </Helmet>
      <Header />
      <main className='page__main page__main--property'>
        <section className='property'>
          {images.length > 0 && (
            <div className='property__gallery-container container'>
              <div className='property__gallery'>
                {images.slice(0, 6).map((imageScr) => (
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
              {isPremium && premiumMarkElement}
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
                      key={`feature-${good}`}
                      className='property__inside-item'
                      data-testid='featureItem'
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
                      data-testid='hostAvatar'
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
              {commentsForOffer.length && (
                <ReviewList comments={commentsForOffer}>
                  {authorizationStatus === AuthorizationStatus.Auth && (
                    <CommentForm offerId={id} />
                  )}
                </ReviewList>
              )}
            </div>
          </div>
          <section className='property__map map'>
            <Map
              city={mapCity}
              points={mapPoints}
              selectedPoint={location}
            />
          </section>
        </section>
        {nearbyOffers.length && nearbyOffersElement}
      </main>
    </div>
  );
}
