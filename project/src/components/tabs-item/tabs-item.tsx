import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeCity } from '../../store/action';
import { CityName } from '../../types/store';

type TabsItemProps = {
  city: CityName;
  currentCity: CityName;
};

export default function TabsItem({
  city,
  currentCity
}: TabsItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className='locations__item'>
      <Link
        className={cn('locations__item-link tabs__item', {
          'tabs__item--active': city === currentCity,
        })}
        to='/'
        onClick={() => {
          dispatch(changeCity(city));
        }}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
}
