import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import TabsList from '../../components/tabs-list/tabs-list';
import CityPlaces from '../../components/city-places/city-places';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

export default function Main(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const offers = allOffers.filter((o) => o.city.name === city);
  const emptyOffers = !offers.length;

  return (
    <div className='page page--gray page--main'>
      <Helmet>
        <title>Six cities</title>
      </Helmet>
      <Header userInfo={undefined} />
      <main
        className={cn('page__main page__main--index', {
          'page__main--index-empty': emptyOffers,
        })}
      >
        <h1 className='visually-hidden'>Cities</h1>
        <TabsList currentCity={city} />
        <div className='cities'>
          {emptyOffers ? (
            <div className='cities__places-container cities__places-container--empty container'>
              <section className='cities__no-places'>
                <div className='cities__status-wrapper tabs__content'>
                  <b className='cities__status'>No places to stay available</b>
                  <p className='cities__status-description'>
                    We could not find any property available at the moment in
                    Dusseldorf
                  </p>
                </div>
              </section>
              <div className='cities__right-section'></div>
            </div>
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
