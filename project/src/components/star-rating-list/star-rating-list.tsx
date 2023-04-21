import { RATING_STARS_NUMBER } from '../../const';
import StarRating from '../star-rating/star-rating';
import {memo} from 'react';

type StarRatingListProps = {
  currentRating: number;
  onChange: (starsNumber: number) => void;
  disabled: boolean;
}

function StarRatingList({
  currentRating,
  onChange,
  disabled,
}: StarRatingListProps): JSX.Element {
  const starIds = Array.from(
    { length: RATING_STARS_NUMBER },
    (_, i) => RATING_STARS_NUMBER - i
  );

  return (
    <div className='reviews__rating-form form__rating'>
      {starIds.map((starsNumber) => {
        const index = starsNumber - 1;
        return (
          <StarRating
            key={`star-rating-${starsNumber}`}
            id={index}
            onChange={() => onChange(starsNumber)}
            isChecked={currentRating === starsNumber}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}

export default memo(StarRatingList);
