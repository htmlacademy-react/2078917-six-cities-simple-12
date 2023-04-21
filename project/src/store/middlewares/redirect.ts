import { PayloadAction } from '@reduxjs/toolkit';
import history from 'history/browser';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { redirectToRoute } from '../action';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === redirectToRoute.toString()) {
      history.push(action.payload);
    }

    return next(action);
  };
