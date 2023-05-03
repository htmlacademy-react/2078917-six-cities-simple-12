import { CommentStarTitles } from '../../const';

type StarRatingProps = {
  id: number;
  onChange: () => void;
  isChecked: boolean;
  disabled: boolean;
};

export default function StarRating({
  id,
  onChange,
  isChecked,
  disabled
}: StarRatingProps): JSX.Element {

  const starsCount = id + 1;

  return (
    <>
      <input
        className='form__rating-input visually-hidden'
        name='rating'
        id={`${starsCount}-stars`}
        type='radio'
        checked={isChecked}
        onChange={onChange}
        value={starsCount}
        disabled={disabled}
        data-testid={`star-${starsCount}`}
      />
      <label
        htmlFor={`${starsCount}-stars`}
        className='reviews__rating-label form__rating-label'
        title={CommentStarTitles[id]}
        data-testid={`star-label-${starsCount}`}
      >
        <svg
          className='form__star-image'
          width='37'
          height='33'
        >
          <use xlinkHref='#icon-star'></use>
        </svg>
      </label>
    </>
  );
}
