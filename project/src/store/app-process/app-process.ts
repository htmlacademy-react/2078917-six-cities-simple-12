import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCity, NameSpace, SortType } from '../../const';
import { AppProcess, CityName } from '../../types/store';
import { clearErrorAction } from '../api-actions';

const initialState: AppProcess = {
  city: initialCity,
  sortType: SortType.Popular,
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(clearErrorAction.fulfilled, (state) => {
        state.error = null;
      });
  }
});

export const { setCity, setSort, setError } = appProcess.actions;
