import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { clearErrorAction } from '../../store/api-actions';
import { getError } from '../../store/app-process/selectors';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error !== null) {
      dispatch(clearErrorAction());
    }
  });

  return error ? <div className='error-message'>{error}</div> : null;
}

export default ErrorMessage;
