import { ChangeEvent, FormEvent, useState } from 'react';
import {
  MAX_CHARACTERS_IN_COMMENT,
  MIN_CHARACTERS_IN_COMMENT,
} from '../../const';
import StarRating from '../star-rating/star-rating';

export default function CommentForm(): JSX.Element {
  const [comment, setComment] = useState({
    stars: 0,
    comment: '',
  });

  const [isButtonEnabled, setButtonEnabled] = useState(false);

  return (
    <form
      className='reviews__form form'
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        // console.log(userComment);
      }}
    >
      <label
        className='reviews__label form__label'
        htmlFor='review'
      >
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {Array.from({ length: 5 }).map((_, index, array) => {
          const revertIndex = array.length - index - 1;
          return (
            <StarRating
              key={revertIndex}
              id={revertIndex}
              onChange={(starsNumber: number) => {
                setComment({
                  ...comment,
                  stars: starsNumber,
                });
              }}
              isChecked={comment.stars === revertIndex + 1}
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
          setButtonEnabled(
            target.value !== '' &&
              target.value.length >= MIN_CHARACTERS_IN_COMMENT &&
              target.value.length <= MAX_CHARACTERS_IN_COMMENT &&
              comment.stars > 0
          );
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
