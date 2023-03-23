import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import StarRating from '../../components/star-rating/star-rating';
import { CommentForOffer } from '../../types/comment';
import { Offer } from '../../types/offer';
import { formatDateToMonthAndYear, formatDateToYearMonthDay, getPercentByRating, getTitleApartmentByType, makeWordPluralOrSingular } from '../../utils';
import NotFound from '../not-found/not-found';

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

  const [userComment, setUserComment] = useState({
    stars: 0,
    comment: ''
  });

  const [buttonEnabled, setButtonEnabled] = useState(false);

  const { id } = useParams();
  const regexp = new RegExp(/^[0-9]+$/);

  if (!regexp.test(String(id))) {
    return <NotFound />;
  }

  const idAsNumber = Number(id);

  const offer = offers.find((o) => o.id === idAsNumber);

  if (!offer) {
    return <NotFound />;
  }

  const commentsForOffer = offersComments.find(
    (c) => c.offerId === idAsNumber
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
      <main className="page__main page__main--property">
        <section className="property">
          {images.length > 0 && (
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((imageScr) => (
                  <div key={imageScr} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={imageScr}
                      alt="Photostudio"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: getPercentByRating(rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {getTitleApartmentByType(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} ${makeWordPluralOrSingular(
                    bedrooms,
                    'Bedroom',
                    'Bedrooms'
                  )}`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} ${makeWordPluralOrSingular(
                    maxAdults,
                    'adult',
                    'adults'
                  )}`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="property__user-status">Pro</span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              {commentsForOffer && (
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;{' '}
                    <span className="reviews__amount">
                      {commentsForOffer.length}
                    </span>
                  </h2>
                  <ul className="reviews__list">
                    {commentsForOffer.map((comment) => (
                      <li key={comment.id} className="reviews__item">
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img
                              className="reviews__avatar user__avatar"
                              src={comment.user.avatarUrl}
                              width="54"
                              height="54"
                              alt="Reviews avatar"
                            />
                          </div>
                          <span className="reviews__user-name">Max</span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span
                                style={{
                                  width: getPercentByRating(comment.rating),
                                }}
                              >
                              </span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">{comment.comment}</p>
                          <time
                            className="reviews__time"
                            dateTime={formatDateToYearMonthDay(
                              new Date(comment.date)
                            )}
                          >
                            {formatDateToMonthAndYear(new Date(comment.date))}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <form
                    className="reviews__form form"
                    onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                      evt.preventDefault();
                      // console.log(userComment);
                    }}
                  >
                    <label
                      className="reviews__label form__label"
                      htmlFor="review"
                    >
                      Your review
                    </label>
                    <div className="reviews__rating-form form__rating">
                      {Array.from({ length: 5 }).map((_, index, array) => {

                        const revertIndex = array.length - index - 1;
                        return (
                          <StarRating
                            key={revertIndex}
                            id={revertIndex}
                            onChange={(starsNumber) => {
                              setUserComment({
                                ...userComment,
                                stars: starsNumber,
                              });
                            }}
                            isChecked={userComment.stars === revertIndex + 1}
                          />
                        );
                      })}
                    </div>
                    <textarea
                      className="reviews__textarea form__textarea"
                      id="review"
                      name="review"
                      placeholder="Tell how was your stay, what you like and what can be improved"
                      value={userComment.comment}
                      onChange={({
                        target,
                      }: ChangeEvent<HTMLTextAreaElement>) => {
                        setUserComment({
                          ...userComment,
                          comment: target.value,
                        });
                        setButtonEnabled(target.value !== '' && target.value.length >= 50 && target.value.length <= 300 && userComment.stars > 0);
                      }}
                    >
                    </textarea>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                        To submit review please make sure to set{' '}
                        <span className="reviews__star">rating</span> and
                        describe your stay with at least{' '}
                        <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button
                        className="reviews__submit form__submit button"
                        type="submit"
                        disabled={!buttonEnabled}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </section>
              )}
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((o) => (
                <PlaceCard key={o.id} offer={o} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
