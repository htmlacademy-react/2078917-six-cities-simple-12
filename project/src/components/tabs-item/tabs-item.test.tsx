import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { NameSpace } from '../../const';
import { CityName } from '../../types/store';
import HistoryRouter from '../history-router/history-router';
import TabsItem from './tabs-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const city: CityName = 'Paris';
const currentCity:CityName = 'Amsterdam';

const store = mockStore({
  [NameSpace.App]: {
    city: city,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path='*'
          element={
            <TabsItem
              city={currentCity}
              currentCity={currentCity}
            />
          }
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: TabsItem', () => {

  beforeEach(() => {
    history.push('/fake');
  });

  it('should render correctly', () => {
    render(fakeComponent);

    expect(screen.getByRole('link')).toHaveClass('tabs__item--active');
    expect(
      screen.getByText(new RegExp(`${currentCity}`, 'i'))
    ).toBeInTheDocument();
  });

  it('should call action when user click on tabs item', async () => {
    render(fakeComponent);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByRole('link'));
    });

    const actions = store.getActions();
    expect(actions[0].type).toBe('APP/setCity');
  });
});
