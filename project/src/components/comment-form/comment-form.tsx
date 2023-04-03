import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  MAX_CHARACTERS_IN_COMMENT,
  MIN_CHARACTERS_IN_COMMENT,
  RATING_STARS_NUMBER,
} from '../../const';
import StarRating from '../star-rating/star-rating';

export default function CommentForm(): JSX.Element {
  const [comment, setComment] = useState({
    stars: 0,
    comment: '',
  });

  const [isButtonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    if (
      comment.comment.length >= MIN_CHARACTERS_IN_COMMENT &&
      comment.comment.length <= MAX_CHARACTERS_IN_COMMENT &&
      comment.stars > 0
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [comment.stars, comment.comment]);

  return (
    <form
      className='reviews__form form'
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setComment({
          stars: 0,
          comment: '',
        });
      }}
    >
      <label
        className='reviews__label form__label'
        htmlFor='review'
      >
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {Array.from({ length: RATING_STARS_NUMBER }).map((_, index) => {
          const revertIndex = RATING_STARS_NUMBER - index - 1;
          const starsNumber = revertIndex + 1;
          return (
            <StarRating
              key={`star-rating-${revertIndex}`}
              id={revertIndex}
              onChange={() => {
                setComment({
                  ...comment,
                  stars: starsNumber,
                });
              }}
              isChecked={comment.stars === starsNumber}
            />
          );
        })}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={comment.comment}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          setComment({
            ...comment,
            comment: target.value,
          });
        }}
      >
      </textarea>
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set{' '}
          <span className='reviews__star'>rating</span> and describe your stay
          with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={!isButtonEnabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
