import { render, screen } from '@testing-library/react';
import StarRating from './star-rating';

const id = 1;
const onChange = jest.fn();
const isChecked = true;
const disabled = false;

const fakeComponent = (
  <StarRating
    id={id}
    onChange={onChange}
    isChecked={isChecked}
    disabled={disabled}
  />
);

describe('Component: StarRating', () => {
  it('should render star rating correctly', () => {
    render(fakeComponent);

    expect(screen.getByTestId(`star-${id + 1}`)).toBeChecked();

    expect(screen.getByTestId(`star-${id + 1}`)).toHaveAttribute(
      'value',
      String(id + 1)
    );

    expect(screen.getByTestId(`star-${id + 1}`)).not.toBeDisabled();

  });

});
