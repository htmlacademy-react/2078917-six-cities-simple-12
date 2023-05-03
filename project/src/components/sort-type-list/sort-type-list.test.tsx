import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortType } from '../../const';
import SortTypeList from './sort-type-list';

const currentSortType = SortType.PriceHigh;
const onChange = jest.fn();

const fakeComponent = (
  <SortTypeList
    onChange={onChange}
    currentSortType={currentSortType}
  />
);

describe('Component: SortTypeList', () => {
  it('should render correctly', () => {

    render(fakeComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('currentSortType')).toHaveTextContent(new RegExp(`${currentSortType}`, 'i'));
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    const sortTypeKeys = Object.keys(SortType) as Array<keyof typeof SortType>;

    const sortTypes = screen.getAllByRole('listitem');

    expect(sortTypes.length).toBe(sortTypeKeys.length);

    expect(sortTypes.filter((s) => s.classList.contains('places__option--active')).length).toBe(1);

  });

  it('should drop/wrap sort type list when user click on list', async () => {
    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('currentSortType'));
    });
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('currentSortType'));
    });

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should drop/wrap sort type list when user press enter', async () => {
    render(fakeComponent);

    screen.getByTestId('currentSortType').focus();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.keyboard('{enter}');
    });

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.keyboard('{enter}');
    });

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should wrap sort type list when user press escape', async () => {
    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('currentSortType'));
    });

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.keyboard('{Escape}');
    });

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should wrap sort type list when user click out of the list', async () => {
    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('currentSortType'));
    });

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByText('Sort by'));
    });

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should call onChange when user click on sort type list item', async () => {
    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByText(SortType.TopRated));
    });

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledTimes(1);
  });

  it('should call onChange when user press Enter on sort type list item', async () => {
    render(fakeComponent);

    screen.getByText(SortType.TopRated).focus();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.keyboard('{enter}');
    });

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledTimes(1);
  });
});
