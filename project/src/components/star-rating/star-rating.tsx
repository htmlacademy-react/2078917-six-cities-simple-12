import { CommentStarTitle } from '../../const';

type StarRatingProps = {
  id: number;
  onChange: () => void;
  isChecked: boolean;
};

export default function StarRating({
  id,
  onChange,
  isChecked,
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
      />
      <label
        htmlFor={`${starsCount}-stars`}
        className='reviews__rating-label form__rating-label'
        title={CommentStarTitle[id]}
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
