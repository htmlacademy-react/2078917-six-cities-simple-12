import { Comment } from '../../types/comment';
import { formatDateToMonthAndYear, formatDateToYearMonthDay, getPercentByRating } from '../../utils';

type ReviewProps = {
  comment: Comment;
};

export default function Review({ comment }: ReviewProps): JSX.Element {
  return (
    <li
      key={comment.id}
      className='reviews__item'
    >
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img
            className='reviews__avatar user__avatar'
            src={comment.user.avatarUrl}
            width='54'
            height='54'
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>Max</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span
              style={{
                width: getPercentByRating(comment.rating),
              }}
            >
            </span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>{comment.comment}</p>
        <time
          className='reviews__time'
          dateTime={formatDateToYearMonthDay(new Date(comment.date))}
        >
          {formatDateToMonthAndYear(new Date(comment.date))}
        </time>
      </div>
    </li>
  );
}
