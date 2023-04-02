import { Offer } from '../../types/offer';
import { CityName } from '../../types/store';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { OfferCardType } from '../../const';

type CityPlacesProps = {
  currentCity: CityName;
  offers: Offer[];
};

export default function CityPlaces({
  currentCity,
  offers,
}: CityPlacesProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );
  const offersNumber = offers.length;
  const city = offers.at(0)?.city;
  const points = offers.map((offer) => offer.location);
  const selectedPoint = selectedOffer?.location;

  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>
          {offersNumber} places to stay in {currentCity}
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
          offers={offers}
          onOfferHover={(offer) => setSelectedOffer(offer)}
          onOfferLeave={() => setSelectedOffer(undefined)}
          cardType={OfferCardType.Offer}
        />
      </section>
      <div className='cities__right-section'>
        <section className='cities__map map'>
          <Map
            city={city}
            points={points}
            selectedPoint={selectedPoint}
          />
        </section>
      </div>
    </div>
  );
}
