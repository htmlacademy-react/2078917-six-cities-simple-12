import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const getAuthorizationInfo = (state: State) => state[NameSpace.User].authorizationInfo;
