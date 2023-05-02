import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { cityNames } from '../../const';
import { CityName } from '../../types/store';
import HistoryRouter from '../history-router/history-router';
import TabsList from './tabs-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const currentCity: CityName = 'Amsterdam';

const store = mockStore({});

const fakeComponent = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path='*'
          element={
            <TabsList
              currentCity={currentCity}
            />
          }
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);
describe('Component: TabsList', () => {

  it('should render correctly', () => {
    history.push('/fake');

    render(fakeComponent);

    const tabsItems = screen.getAllByRole('listitem');

    expect(tabsItems.length).toBe(cityNames.length);
  });
});
