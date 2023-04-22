import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import { AppRoute, OfferCardType } from '../../const';
import { getFakeOffer } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import PlaceCard from './place-card';
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
