import { store } from '../store';
import { setError } from '../store/app-process/app-process';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
};
