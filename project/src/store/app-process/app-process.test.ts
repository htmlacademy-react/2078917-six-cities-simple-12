import { INITIAL_CITY, SortType } from '../../const';
import { CityName } from '../../types/store';
import { appProcess, setCity, setError, setSort } from './app-process';

describe('Reducer: AppProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      city: INITIAL_CITY,
      sortType: SortType.Popular,
      error: null,
    });
  });

  it('should return given city name', () => {
    const cityName: CityName = 'Cologne';
    const state = {
      city: INITIAL_CITY,
      sortType: SortType.Popular,
      error: null,
    };
    expect(appProcess.reducer(state, setCity(cityName))).toEqual({
      city: cityName,
      sortType: SortType.Popular,
      error: null,
    });
  });

  it('should return given error text', () => {
    const errorText = 'ERROR_TEST';
    const state = {
      city: INITIAL_CITY,
      sortType: SortType.Popular,
      error: null,
    };
    expect(appProcess.reducer(state, setError(errorText))).toEqual({
      city: INITIAL_CITY,
      sortType: SortType.Popular,
      error: errorText,
    });
  });

  it('should return giver sort type', () => {
    const sortType = SortType.TopRated;
    const state = {
      city: INITIAL_CITY,
      sortType: SortType.Popular,
      error: null,
    };
    expect(appProcess.reducer(state, setSort(sortType))).toEqual({
      city: INITIAL_CITY,
      sortType: sortType,
      error: null,
    });
  });
});

