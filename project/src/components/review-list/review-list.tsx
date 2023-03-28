import Review from '../review/review';
import { Comment } from '../../types/comment';

type ReviewListProps = {
  comments: Comment[];
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
          <Review
            key={`review ${comment.id}`}
            comment={comment}
          />
        ))}
      </ul>
      {children}
    </section>
  );
}
