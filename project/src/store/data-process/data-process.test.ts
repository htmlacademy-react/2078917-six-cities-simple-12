import { DataProcess } from '../../types/store';
import { dataProcess, loadComments, loadNearbyOffers, loadOffer, loadOffers, setCommentDataSendingStatus, setCommentDataSentStatus, setOfferDataLoadingStatus, setOffersDataLoadingStatus } from './data-process';
import { Offer } from '../../types/offer';
import { getFakeComments, getFakeOffer, getFakeOffers } from '../../utils/mock';
import { Review } from '../../types/comment';
import { fetchOffersAction, fetchRoomAction, sendCommentAction } from '../api-actions';

describe('Reducer: DataProcess', () => {

  let state: DataProcess;
  beforeEach(() => {
    state = {
      offers: [],
      isOffersDataLoading: true,
      isOfferDataLoading: true,
      offer: null,
      comments: [],
      nearbyOffers: [],
      isCommentSending: false,
      isCommentSent: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  it('should return given offers', () => {
    const offers: Offer[] = getFakeOffers();

    expect(dataProcess.reducer(state, loadOffers(offers))
    ).toEqual({
      ...state,
      offers,
    });
  });

  it('should return given offer', () => {
    const offer: Offer = getFakeOffer();

    expect(dataProcess.reducer(state, loadOffer(offer))
    ).toEqual({
      ...state,
      offer,
    });
  });

  it('should return given comments', () => {
    const comments: Review[] = getFakeComments();

    expect(dataProcess.reducer(state, loadComments(comments))).toEqual({
      ...state,
      comments,
    });
  });

  it('should return given nearby offers', () => {
    const nearbyOffers: Offer[] = getFakeOffers();

    expect(dataProcess.reducer(state, loadNearbyOffers(nearbyOffers))).toEqual({
      ...state,
      nearbyOffers,
    });
  });

  it('should set offers data loading status', () => {
    const isOffersDataLoading = !state.isOffersDataLoading;

    expect(
      dataProcess.reducer(state, setOffersDataLoadingStatus(isOffersDataLoading))
    ).toEqual({
      ...state,
      isOffersDataLoading,
    });
  });

  it('should set offer data loading status', () => {
    const isOfferDataLoading = !state.isOfferDataLoading;
    expect(
      dataProcess.reducer(state, setOfferDataLoadingStatus(isOfferDataLoading))
    ).toEqual({
      ...state,
      isOfferDataLoading,
    });
  });

  it('should set comment sending status', () => {
    const isCommentSending = !state.isCommentSending;
    expect(
      dataProcess.reducer(state, setCommentDataSendingStatus(isCommentSending))
    ).toEqual({
      ...state,
      isCommentSending,
    });
  });

  it('should set comment sent status', () => {
    const isCommentSent = !state.isCommentSent;
    expect(
      dataProcess.reducer(state, setCommentDataSentStatus(isCommentSent))
    ).toEqual({
      ...state,
      isCommentSent,
    });
  });

  it('should update isOffersDataLoading to "true" if fetchOffersAction pending', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchOffersAction.pending.type,
      })
    ).toEqual({
      ...state,
      isOffersDataLoading: true,
    });
  });

  it('should update isOffersDataLoading to "false" and offers to given payload if fetchOffersAction fulfilled', () => {
    const offers: Offer[] = getFakeOffers();

    expect(
      dataProcess.reducer(state, {
        type: fetchOffersAction.fulfilled.type,
        payload: offers,
      })
    ).toEqual({
      ...state,
      isOffersDataLoading: false,
      offers
    });
  });

  it('should update isOffersDataLoading to "false" if fetchOffersAction rejected', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchOffersAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isOffersDataLoading: false,
    });
  });

  it('should update isCommentSending to "true" and isCommentSent to "false" if sendCommentAction pending', () => {
    expect(
      dataProcess.reducer(state, {
        type: sendCommentAction.pending.type,
      })
    ).toEqual({
      ...state,
      isCommentSending: true,
      isCommentSent: false,
    });
  });

  it('should update isCommentSending to "false", isCommentSent to "true" and offers to given payload if sendCommentAction fulfilled', () => {
    const comments: Review[] = getFakeComments();

    expect(
      dataProcess.reducer(state, {
        type: sendCommentAction.fulfilled.type,
        payload: comments,
      })
    ).toEqual({
      ...state,
      isCommentSending: false,
      isCommentSent: true,
      comments,
    });
  });

  it('should update isCommentSending to "false" if sendCommentAction rejected', () => {
    expect(
      dataProcess.reducer(state, {
        type: sendCommentAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isCommentSending: false,
    });
  });

  it('should update isOfferDataLoading to "true" if fetchRoomAction pending', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchRoomAction.pending.type,
      })
    ).toEqual({
      ...state,
      isOfferDataLoading: true,
    });
  });

  it('should update isOfferDataLoading to "false"and offer, reviews, nearby offers to given payload if fetchRoomAction fulfilled', () => {
    const offer: Offer = getFakeOffer();
    const comments: Review[] = getFakeComments();
    const nearbyOffers: Offer[] = getFakeOffers();

    expect(
      dataProcess.reducer(state, {
        type: fetchRoomAction.fulfilled.type,
        payload: [offer, comments, nearbyOffers],
      })
    ).toEqual({
      ...state,
      isOfferDataLoading: false,
      offer,
      comments,
      nearbyOffers,
    });
  });

  it('should update isOfferDataLoading to "false" if fetchRoomAction rejected', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchRoomAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isOfferDataLoading: false,
    });
  });

});
