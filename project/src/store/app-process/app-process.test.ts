import { INITIAL_CITY, SortType } from '../../const';
import { AppProcess, CityName } from '../../types/store';
import { clearErrorAction, sendCommentAction } from '../api-actions';
import { appProcess, setCity, setError, setSort } from './app-process';

describe('Reducer: AppProcess', () => {
  let state: AppProcess;
  beforeEach(() => {
    state = {
      city: INITIAL_CITY,
      sortType: SortType.Popular,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  it('should return given city name', () => {
    const city: CityName = 'Cologne';
    expect(appProcess.reducer(state, setCity(city))).toEqual({
      ...state,
      city,
    });
  });

  it('should return given error text', () => {
    const error = 'ERROR_TEST';
    expect(appProcess.reducer(state, setError(error))).toEqual({
      ...state,
      error,
    });
  });

  it('should return given sort type', () => {
    const sortType = SortType.TopRated;
    expect(appProcess.reducer(state, setSort(sortType))).toEqual({
      ...state,
      sortType,
    });
  });

  it('should set error to NULL if clearErrorAction fulfilled', () => {
    expect(
      appProcess.reducer(state, {
        type: clearErrorAction.fulfilled.type,
      })
    ).toEqual({
      ...state,
      error: null,
    });
  });

  it('should set error to given payload if sendCommentAction rejected', () => {
    const errorStr = 'ERROR_STRING';
    const error = {
      message: errorStr,
    };

    expect(
      appProcess.reducer(state, {
        type: sendCommentAction.rejected.type,
        error,
      })
    ).toEqual({
      ...state,
      error: errorStr,
    });
  });
});
