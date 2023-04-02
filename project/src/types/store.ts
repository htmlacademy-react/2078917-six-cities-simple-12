import { cityNames } from '../const';
import { store } from '../store';

export type CityName = typeof cityNames[number];

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;
