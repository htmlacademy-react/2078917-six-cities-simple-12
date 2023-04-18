import { cityNames } from '../../const';
import { CityName } from '../../types/store';
import TabsItem from '../tabs-item/tabs-item';
import {memo} from 'react';

type TabsListProps = {
  currentCity: CityName;
};

function TabsList({ currentCity }: TabsListProps): JSX.Element {
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

export default memo(TabsList);
