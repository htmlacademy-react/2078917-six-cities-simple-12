import { render, screen } from '@testing-library/react';
import { getFakeComment } from '../../utils/mock';
import ReviewItem from './review-item';

const review = getFakeComment();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(<ReviewItem review={review} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      review.user.avatarUrl
    );
    expect(
      screen.getByText(new RegExp(`${review.comment}`, 'i'))
    ).toBeInTheDocument();
  });
});
