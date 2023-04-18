import { useEffect } from 'react';
import { fetchRoomAction } from '../store/api-actions';
import { getComments, getNearbyOffers, getOffer } from '../store/data-process/selectors';
import { Review } from '../types/comment';
import { Offer } from '../types/offer';
import { orderReviewCallback } from '../utils';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useGetRoom(id: number): [Offer | null, Review[], Offer[]] {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isNaN(id)) {
      dispatch(fetchRoomAction(id));
    }
  }, [dispatch, id]);

  const offer = useAppSelector(getOffer);
  const commentsForOffer = useAppSelector(getComments);
  const sortedComments = [...commentsForOffer].sort(orderReviewCallback).slice(0, 10);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  return [offer, sortedComments, nearbyOffers];
}
