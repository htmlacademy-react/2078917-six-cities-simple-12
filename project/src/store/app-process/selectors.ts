import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getCity = (state: State) => state[NameSpace.App].city;
export const getSortType = (state: State) => state[NameSpace.App].sortType;
export const getError = (state: State) => state[NameSpace.App].error;
