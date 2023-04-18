import cn from 'classnames';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setCity } from '../../store/app-process/app-process';
import { CityName } from '../../types/store';

type TabsItemProps = {
  city: CityName;
  currentCity: CityName;
};

export default function TabsItem({
  city,
  currentCity,
}: TabsItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleClick(evt: MouseEvent) {
    dispatch(setCity(city));
    evt.preventDefault();
  }

  return (
    <li className='locations__item'>
      <Link
        className={cn('locations__item-link tabs__item', {
          'tabs__item--active': city === currentCity,
        })}
        to='/'
        onClick={(evt: MouseEvent) => handleClick(evt)}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
}
