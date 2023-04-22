import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import TabsList from '../../components/tabs-list/tabs-list';
import CityPlaces from '../../components/city-places/city-places';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { SortTypeFunctionsMap } from '../../maps';
import Loading from '../loading/loading';
import NoPlaceAvailable from '../../components/no-place-available/no-place-available';
import { useMemo } from 'react';
import { getCity, getSortType } from '../../store/app-process/selectors';
import { getIsOffersDataLoading, getOffers } from '../../store/data-process/selectors';

export default function Main(): JSX.Element {

  const city = useAppSelector(getCity);
  const allOffers = useAppSelector(getOffers);
  const sortType = useAppSelector(getSortType);
  const isOffersLoading = useAppSelector(getIsOffersDataLoading);

  const offers = useMemo(() =>
    allOffers
      .filter((o) => o.city.name === city)
      .sort(SortTypeFunctionsMap[sortType])
  , [allOffers, city, sortType]);

  const isEmptyOffers = !offers.length;

  if (isOffersLoading) {
    return <Loading />;
  }

  return (
    <div className='page page--gray page--main'>
      <Helmet>
        <title>Six cities</title>
      </Helmet>
      <Header />
      <main
        className={cn('page__main page__main--index', {
          'page__main--index-empty': isEmptyOffers,
        })}
        data-testid='mainContainer'
      >
        <h1 className='visually-hidden'>Cities</h1>
        <TabsList currentCity={city} />
        <div className='cities'>
          {isEmptyOffers ? (
            <NoPlaceAvailable currentCity={city} />
          ) : (
            <CityPlaces
              currentCity={city}
              offers={offers}
            />
          )}
        </div>
      </main>
    </div>
  );
}
