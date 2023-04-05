import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../const';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/store';
import { loadOffers, setOffersDataLoadingStatus } from './action';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(ApiRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});
