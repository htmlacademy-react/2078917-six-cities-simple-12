import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import useButtonEnable from '../../hooks/use-button-enable';
import useFormDisable from '../../hooks/use-form-disable';
import { sendCommentAction } from '../../store/api-actions';
import { getIsCommentSent } from '../../store/data-process/selectors';
import StarRatingList from '../star-rating-list/star-rating-list';

type CommentFormProps = {
  offerId: number;
}

export default function CommentForm({offerId}: CommentFormProps): JSX.Element {

  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const dispatch = useAppDispatch();
  const isCommentSent = useAppSelector(getIsCommentSent);
  const isButtonEnabled = useButtonEnable(userComment, userRating);
  const isFormDisabled = useFormDisable();

  useEffect(() => {
    if (isCommentSent) {
      setUserComment('');
      setUserRating(0);
    }
  }, [isCommentSent]);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    dispatch(sendCommentAction({
      comment: userComment,
      rating:userRating,
      offerId
    }));
  }

  function handleUserCommentChange(target: HTMLTextAreaElement) {
    setUserComment(target.value);
  }

  const handleRatingChange = useCallback(
    (starsNumber: number) => {
      setUserRating(starsNumber);
    },
    [setUserRating]
  );

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
        <StarRatingList
          onChange={handleRatingChange}
          currentRating={userRating}
          disabled={isFormDisabled}
        />
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={userComment}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
          handleUserCommentChange(target)}
        disabled={isFormDisabled}
        data-testid='commentText'
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
          data-testid="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
