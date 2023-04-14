import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  MAX_CHARACTERS_IN_COMMENT,
  MIN_CHARACTERS_IN_COMMENT,
  RATING_STARS_NUMBER,
} from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { sendCommentAction } from '../../store/api-actions';
import { UserComment } from '../../types/comment';
import StarRating from '../star-rating/star-rating';

type CommentFormProps = {
  offerId: number;
}

export default function CommentForm({offerId}: CommentFormProps): JSX.Element {

  const [comment, setComment] = useState<UserComment>({
    rating: 0,
    comment: '',
  });

  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const dispatch = useAppDispatch();

  const isCommentSending = useAppSelector((state) => state.isCommentSending);

  const isCommentSent = useAppSelector((state) => state.isCommentSent);

  useEffect(() => {
    if (
      comment.comment.length >= MIN_CHARACTERS_IN_COMMENT &&
      comment.comment.length <= MAX_CHARACTERS_IN_COMMENT &&
      comment.rating > 0
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [comment.rating, comment.comment]);

  useEffect(() => {
    if (isCommentSending) {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  }, [isCommentSending]);

  useEffect(() => {
    if (isCommentSent) {
      setComment({
        rating: 0,
        comment: '',
      });
    }
  }, [isCommentSent]);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(sendCommentAction({...comment, offerId}));
  }

  return (
    <form
      className='reviews__form form'
      onSubmit={handleSubmit}
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
                  rating: starsNumber,
                });
              }}
              isChecked={comment.rating === starsNumber}
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
