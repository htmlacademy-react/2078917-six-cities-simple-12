import { useEffect, useState } from 'react';
import { MAX_CHARACTERS_IN_COMMENT, MIN_CHARACTERS_IN_COMMENT } from '../const';
import { getIsCommentSending } from '../store/data-process/selectors';
import { useAppSelector } from './use-app-selector';

export default function useButtonEnable(userComment: string, userRating: number): boolean {

  const isCommentSending = useAppSelector(getIsCommentSending);

  const [isButtonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    if (
      userComment.length >= MIN_CHARACTERS_IN_COMMENT &&
      userComment.length <= MAX_CHARACTERS_IN_COMMENT &&
      userRating > 0
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [userComment, userRating]);

  useEffect(() => {
    if (isCommentSending) {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  }, [isCommentSending]);

  return isButtonEnabled;

}
