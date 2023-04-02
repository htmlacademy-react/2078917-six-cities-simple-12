import { cityNames } from '../../const';
import { CityName } from '../../types/store';
import TabsItem from '../tabs-item/tabs-item';

type TabsListProps = {
  currentCity: CityName;
};

export default function TabsList({ currentCity }: TabsListProps): JSX.Element {
  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {cityNames.map((name) => (
            <TabsItem
              key={`city-${name}`}
              currentCity={currentCity}
              city={name}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
