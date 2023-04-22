import { render, screen } from '@testing-library/react';
import { getFakeComments } from '../../utils/mock';
import ReviewList from './review-list';

const comments = getFakeComments();

describe('Component: ReviewList', () => {
  it('should render correctly reviews', () => {
    render(<ReviewList comments={comments} />);

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
    expect(screen.getByTestId('commentsNumber').textContent).toBe(String(comments.length));

    const placeCards = screen.getAllByRole('listitem');
    expect(placeCards.length).toBeLessThanOrEqual(10);
  });
});
