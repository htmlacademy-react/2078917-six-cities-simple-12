import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/comment';

type ReviewListProps = {
  comments: Review[];
  children?: React.ReactNode;
};

export default function ReviewList({
  comments,
  children,
}: ReviewListProps): JSX.Element {
  return (
    <section className='property__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews &middot;{' '}
        <span className='reviews__amount'>{comments.length}</span>
      </h2>
      <ul className='reviews__list'>
        {comments.map((comment) => (
          <ReviewItem
            key={`review ${comment.id}`}
            review={comment}
          />
        ))}
      </ul>
      {children}
    </section>
  );
}
