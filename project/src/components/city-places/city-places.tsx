import { Offer } from '../../types/offer';
import { CityName } from '../../types/store';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { OfferCardType, SortType } from '../../const';
import SortTypeList from '../sort-type-list/sort-type-list';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getSortType } from '../../store/app-process/selectors';
import {setSort} from '../../store/app-process/app-process';

type CityPlacesProps = {
  currentCity: CityName;
  offers: Offer[];
};

export default function CityPlaces({
  currentCity,
  offers,
}: CityPlacesProps): JSX.Element {
  const currentSortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );
  const offersNumber = offers.length;
  const city = offers.at(0)?.city;
  const points = offers.map((offer) => offer.location);
  const selectedPoint = selectedOffer?.location;

  function handleOfferHover(offer: Offer) {
    setSelectedOffer(offer);
  }

  function handleOfferLeave() {
    setSelectedOffer(undefined);
  }

  function handleSortTypeChange(sortType: SortType) {
    dispatch(setSort(sortType));
  }

  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>
          {offersNumber} places to stay in {currentCity}
        </b>
        <SortTypeList
          onChange={(sortType) => handleSortTypeChange(sortType)}
          currentSortType={currentSortType}
        />
        <PlaceCardList
          offers={offers}
          onOfferHover={handleOfferHover}
          onOfferLeave={handleOfferLeave}
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
