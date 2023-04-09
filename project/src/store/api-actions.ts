import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { ApiRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { saveToken } from '../services/token';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/store';
import { AuthorizationInfo, Credentials } from '../types/user';
import {
  loadOffers,
  redirectToRoute,
  setAuthorizationInfo,
  setAuthorizationStatus,
  setError,
  setOffersDataLoadingStatus,
} from './action';

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

export const checkAuthorizationStatusAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/checkAuthorizationStatus', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<AuthorizationInfo>(ApiRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setAuthorizationInfo(data));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setAuthorizationInfo(undefined));
  }
});

export const getAuthorizationStatusAction = createAsyncThunk<
  void,
  Credentials,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/getAuthorizationStatus',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<AuthorizationInfo>(ApiRoute.Login, {
      email,
      password,
    });
    dispatch(setAuthorizationInfo(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const clearErrorAction = createAsyncThunk('app/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
