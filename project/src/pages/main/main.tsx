import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { CardType, cityNames } from '../../const';
import { Offer } from '../../types/offer';
import Map from '../../components/map/map';
import cn from 'classnames';

type MainProps = {
  placeNum: number;
  offers: Offer[];
};

export default function Main({ placeNum, offers }: MainProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const [selectedCity, setSelectedCity] =
    useState<typeof cityNames[number]>('Paris');

  const selectedOffers = offers.filter((offer) => offer.city.name === selectedCity);

  return (
    <>
      <Helmet>
        <title>Six cities</title>
      </Helmet>
      <Header userInfo={undefined} />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations container'>
            <ul className='locations__list tabs__list'>
              {cityNames.map((name) => (
                <li
                  key={name}
                  className='locations__item'
                  onClick={() => setSelectedCity(name)}
                >
                  <a
                    className={cn('locations__item-link tabs__item', {
                      'tabs__item--active': selectedCity === name,
                    })}
                    href='/'
                  >
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>
                {placeNum} places to stay in {selectedCity}
              </b>
              <form
                className='places__sorting'
                action='#'
                method='get'
              >
                <span className='places__sorting-caption'>Sort by</span>
                <span
                  className='places__sorting-type'
                  tabIndex={0}
                >
                  Popular
                  <svg
                    className='places__sorting-arrow'
                    width='7'
                    height='4'
                  >
                    <use xlinkHref='#icon-arrow-select'></use>
                  </svg>
                </span>
                <ul className='places__options places__options--custom places__options--opened'>
                  <li
                    className='places__option places__option--active'
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li
                    className='places__option'
                    tabIndex={0}
                  >
                    Price: low to high
                  </li>
                  <li
                    className='places__option'
                    tabIndex={0}
                  >
                    Price: high to low
                  </li>
                  <li
                    className='places__option'
                    tabIndex={0}
                  >
                    Top rated first
                  </li>
                </ul>
              </form>
              <PlaceCardList
                offers={selectedOffers}
                onOfferHover={(offer) => setSelectedOffer(offer)}
                onOfferLeave={() => setSelectedOffer(undefined)}
                cardType={CardType.Offer}
              />
            </section>
            <div className='cities__right-section'>
              <section className='cities__map map'>
                <Map
                  city={
                    selectedOffers.length !== 0
                      ? selectedOffers[0].city
                      : undefined
                  }
                  points={offers.map((offer) => offer.location)}
                  selectedPoint={selectedOffer?.location}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
