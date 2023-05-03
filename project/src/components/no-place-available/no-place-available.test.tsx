import { render, screen } from '@testing-library/react';
import { CityName } from '../../types/store';
import NoPlaceAvailable from './no-place-available';

const currentCity: CityName = 'Paris';

describe('Component: NoPlaceAvailable', () => {
  it('should render correctly', () => {
    render(<NoPlaceAvailable currentCity={currentCity} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(
          `We could not find any property available at the moment in ${currentCity}`,
          'i'
        )
      )
    ).toBeInTheDocument();
  });
});
