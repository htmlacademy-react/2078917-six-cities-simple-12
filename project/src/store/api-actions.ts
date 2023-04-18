import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { saveToken, dropToken } from '../services/token';
import { Review, UserComment } from '../types/comment';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/store';
import { AuthorizationInfo, Credentials } from '../types/user';
import { redirectToRoute } from './action';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(ApiRoute.Offers);
  return data;
});

export const checkAuthorizationStatusAction = createAsyncThunk<
  AuthorizationInfo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/checkAuthorizationStatus', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<AuthorizationInfo>(ApiRoute.Login);
  return data;
});

export const endSessionAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/endSession', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get<AuthorizationInfo>(ApiRoute.Login);
  } finally {
    dropToken();
  }
});

export const getAuthorizationStatusAction = createAsyncThunk<
  AuthorizationInfo,
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
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));

    return data;
  }
);

export const clearErrorAction = createAsyncThunk('app/clearError', async () => {
  await new Promise((f) => setTimeout(f, TIMEOUT_SHOW_ERROR));
});

export const fetchRoomAction = createAsyncThunk<
  [Offer | null, Review[], Offer[]],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchRoom', async (offerId, { dispatch, extra: api }) => {
  const [offerResult, reviewResult, nearbyOffersResult] =
    await Promise.allSettled([
      api.get<Offer>(ApiRoute.Offer.replace('{offerId}', String(offerId))),
      api.get<Review[]>(
        ApiRoute.Comments.replace('{offerId}', String(offerId))
      ),
      api.get<Offer[]>(
        ApiRoute.NearbyOffers.replace('{offerId}', String(offerId))
      ),
    ]);

  let offer: Offer | null = null;
  let reviews: Review[] = [];
  let nearbyOffers: Offer[] = [];

  if (offerResult.status === 'fulfilled') {
    offer = offerResult.value.data;
  }

  if (reviewResult.status === 'fulfilled') {
    reviews = reviewResult.value.data;
  }

  if (nearbyOffersResult.status === 'fulfilled') {
    nearbyOffers = nearbyOffersResult.value.data;
  }

  return [offer, reviews, nearbyOffers];
});

export const sendCommentAction = createAsyncThunk<
  Review[],
  UserComment & { offerId: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/sendComment',
  async ({ comment, rating, offerId }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review[]>(
      ApiRoute.Comments.replace('{offerId}', String(offerId)),
      {
        comment,
        rating,
      }
    );
    return data;
  }
);
