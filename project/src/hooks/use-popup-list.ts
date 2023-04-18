import { useEffect, useState } from 'react';

export default function usePopupList(
  sortTypeListRef: React.RefObject<HTMLUListElement>
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isSortOptionsOpen, setSortOptionsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        setSortOptionsOpen(false);
      }
    }

    function handleClick(evt: MouseEvent) {
      const target = evt.target as HTMLElement;

      if (sortTypeListRef.current !== null) {
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
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClick, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick, true);
    };
  });

  return [isSortOptionsOpen, setSortOptionsOpen];
}
