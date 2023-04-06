import { SortType } from '../../const';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

type SortTypeListProps = {
  onChange: (sortType: SortType) => void;
  currentSortType: SortType;
};

export default function SortTypeList({
  onChange,
  currentSortType,
}: SortTypeListProps): JSX.Element {
  const sortTypeKeys = Object.keys(SortType) as Array<keyof typeof SortType>;
  const [isSortOptionsOpen, setSortOptionsOpen] = useState(false);
  const sortTypeListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleKeyPress(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        setSortOptionsOpen(false);
      }
    }

    function handleClick(evt: MouseEvent) {
      const target = evt.target as HTMLElement;

      if (sortTypeListRef !== null && sortTypeListRef.current !== null) {
        const sortTypeListClasses = Object.values(
          sortTypeListRef.current.classList
        )
          .map((c) => `.${c}`)
          .join('');
        if (!target.closest(sortTypeListClasses)) {
          setSortOptionsOpen(false);
          evt.stopPropagation();
        }
      }
    }

    if (isSortOptionsOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('click', handleClick, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick, true);
    };
  });

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
