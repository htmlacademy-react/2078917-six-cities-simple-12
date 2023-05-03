import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RATING_STARS_NUMBER } from '../../const';
import StarRatingList from './star-rating-list';

const currentRating = 0;
const futureRating = 4;
const onChange = jest.fn();
const disabled = false;

const fakeComponent = (
  <StarRatingList
    currentRating={currentRating}
    onChange={onChange}
    disabled={disabled}
  />
);

describe('Component: StarRatingList', () => {
  it('should render star rating list correctly', () => {
    render(fakeComponent);

    const stars = screen.getAllByRole('radio');
    expect(stars.length).toBe(RATING_STARS_NUMBER);
  });


  it('should call onChange when user click on star', async () => {
    render(fakeComponent);

    await userEvent.click(screen.getByTestId(`star-label-${futureRating}`));

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledTimes(1);
  });
});
