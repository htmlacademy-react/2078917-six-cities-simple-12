import {render, screen} from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    render(
      <Loading />
    );

    const textElement = screen.getByText('Loading ...');

    expect(textElement).toBeInTheDocument();
  });
});
