import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Review } from '../../types/comment';
import { Offer } from '../../types/offer';
import { DataProcess } from '../../types/store';
import { fetchOffersAction, fetchRoomAction, sendCommentAction } from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  isOffersDataLoading: true,
  isOfferDataLoading: true,
  offer: null,
  comments: [],
  nearbyOffers: [],
  isCommentSending: false,
  isCommentSent: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    loadOffer: (state, action: PayloadAction<Offer>) => {
      state.offer = action.payload;
    },
    loadComments: (state, action: PayloadAction<Review[]>) => {
      state.comments = action.payload;
    },
    loadNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    setOfferDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOfferDataLoading = action.payload;
    },
    setCommentDataSendingStatus: (state, action: PayloadAction<boolean>) => {
      state.isCommentSending = action.payload;
    },
    setCommentDataSentStatus: (state, action: PayloadAction<boolean>) => {
      state.isCommentSent = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isCommentSending = true;
        state.isCommentSent = false;
      })
      .addCase(
        sendCommentAction.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.comments = action.payload;
          state.isCommentSent = true;
          state.isCommentSending = false;
        }
      )
      .addCase(sendCommentAction.rejected, (state) => {
        state.isCommentSending = false;
      })
      .addCase(fetchRoomAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchRoomAction.fulfilled, (state, action) => {

        state.isOfferDataLoading = false;

        const [offer, reviews, nearbyOffers] = action.payload;
        state.offer = offer;
        state.comments = reviews;
        state.nearbyOffers = nearbyOffers;
      })
      .addCase(fetchRoomAction.rejected, (state) => {
        state.isOfferDataLoading = false;
      });
  }
});

export const {
  loadOffers,
  loadOffer,
  loadComments,
  loadNearbyOffers,
  setOffersDataLoadingStatus,
  setOfferDataLoadingStatus,
  setCommentDataSendingStatus,
  setCommentDataSentStatus,
} = dataProcess.actions;
