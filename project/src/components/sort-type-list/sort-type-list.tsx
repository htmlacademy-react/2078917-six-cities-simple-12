import { SortType } from '../../const';
import cn from 'classnames';
import { memo, useRef } from 'react';
import usePopupList from '../../hooks/use-popup-list';

type SortTypeListProps = {
  onChange: (sortType: SortType) => void;
  currentSortType: SortType;
};

function SortTypeList({
  onChange,
  currentSortType,
}: SortTypeListProps): JSX.Element {

  const sortTypeKeys = Object.keys(SortType) as Array<keyof typeof SortType>;

  const sortTypeListRef = useRef<HTMLUListElement>(null);

  const [isSortOptionsOpen, setSortOptionsOpen] = usePopupList(sortTypeListRef);

  function handleKeyDownList(evt: React.KeyboardEvent<HTMLUListElement>) {
    if (evt.key === 'Enter') {
      setSortOptionsOpen((prev) => !prev);
    }
  }

  function handleKeyDownItem(
    evt: React.KeyboardEvent<HTMLLIElement>,
    sortType: SortType
  ) {
    if (evt.key === 'Enter') {
      onChange(sortType);
      setSortOptionsOpen((prev) => !prev);
    }
  }

  function handleClickList() {
    setSortOptionsOpen((prev) => !prev);
  }

  function handleClickItem(sortType: SortType) {
    onChange(sortType);
    setSortOptionsOpen((prev) => !prev);
  }

  return (
    <form className='places__sorting'>
      <span className='places__sorting-caption'>Sort by</span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={handleClickList}
        onKeyDown={handleKeyDownList}
      >
        {currentSortType}
        <svg
          className='places__sorting-arrow'
          width='7'
          height='4'
        >
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul
        className={cn('places__options places__options--custom', {
          'places__options--opened': isSortOptionsOpen,
        })}
        ref={sortTypeListRef}
      >
        {sortTypeKeys.map((type) => (
          <li
            key={`sort-type-${type}`}
            className={cn('places__option', {
              'places__option--active': currentSortType === SortType[type],
            })}
            tabIndex={0}
            onClick={() => handleClickItem(SortType[type])}
            onKeyDown={(evt: React.KeyboardEvent<HTMLLIElement>) =>
              handleKeyDownItem(evt, SortType[type])}
          >
            {SortType[type]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(SortTypeList, (prevProps, nextProps) =>
  prevProps.currentSortType === nextProps.currentSortType);
