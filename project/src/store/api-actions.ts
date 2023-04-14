import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import {
  ApiRoute,
  AppRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR,
} from '../const';
import { saveToken, dropToken } from '../services/token';
import { Comment, UserComment } from '../types/comment';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/store';
import { AuthorizationInfo, Credentials } from '../types/user';
import {
  isCommentSending,
  isCommentSent,
  loadComments,
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  redirectToRoute,
  setAuthorizationInfo,
  setAuthorizationStatus,
  setError,
  setOfferDataLoadingStatus,
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
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setAuthorizationInfo(undefined));
    dropToken();
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

export const fetchOfferAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer>(
    ApiRoute.Offer.replace('{offerId}', String(offerId))
  );
  dispatch(loadOffer(data));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Comment[]>(
    ApiRoute.Comments.replace('{offerId}', String(offerId))
  );
  dispatch(loadComments(data));
});

export const fetchNearbyOffersAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(
    ApiRoute.NearbyOffers.replace('{offerId}', String(offerId))
  );
  dispatch(loadNearbyOffers(data));
});

export const fetchRoomAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchRoom', async (offerId, { dispatch, extra: api }) => {
  dispatch(setOfferDataLoadingStatus(true));

  try {
    const { data: offer } = await api.get<Offer>(
      ApiRoute.Offer.replace('{offerId}', String(offerId))
    );

    const { data: comments } = await api.get<Comment[]>(
      ApiRoute.Comments.replace('{offerId}', String(offerId))
    );

    const { data: nearbyOffers } = await api.get<Offer[]>(
      ApiRoute.NearbyOffers.replace('{offerId}', String(offerId))
    );

    dispatch(loadOffer(offer));
    dispatch(loadComments(comments));
    dispatch(loadNearbyOffers(nearbyOffers));
  } finally {
    dispatch(setOfferDataLoadingStatus(false));
  }
});

export const sendCommentAction = createAsyncThunk<
  void,
  UserComment & { offerId: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/sendComment',
  async ({ comment, rating, offerId }, { dispatch, extra: api }) => {
    dispatch(isCommentSending(true));
    dispatch(isCommentSent(false));

    try {
      const { data } = await api.post<Comment[]>(
        ApiRoute.Comments.replace('{offerId}', String(offerId)),
        {
          comment,
          rating,
        }
      );
      dispatch(loadComments(data));
      dispatch(isCommentSent(true));
    } finally {
      dispatch(isCommentSending(true));
    }
  }
);
