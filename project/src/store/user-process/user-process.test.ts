import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/store';
import {
  checkAuthorizationStatusAction,
  endSessionAction,
  getAuthorizationStatusAction,
} from '../api-actions';
import { userProcess } from './user-process';
import { image, internet, datatype, name, unique } from 'faker';

describe('Reducer: UserProcess', () => {
  let state: UserProcess;
  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authorizationInfo: undefined,
    };
  });

  const authInfo = {
    avatarUrl: unique(() => image.imageUrl()),
    email: unique(() => internet.email()),
    id: unique(() => datatype.number()),
    isPro: datatype.boolean(),
    name: name.findName(),
    token: 'tokenid',
  };

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  it('should update authorizationStatus to "AUTH" and authorizationInfo to given payload if checkAuthorizationStatusAction fulfilled', () => {
    expect(
      userProcess.reducer(state, {
        type: checkAuthorizationStatusAction.fulfilled.type,
        payload: authInfo,
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
      authorizationInfo: authInfo,
    });
  });

  it('should update authorizationStatus to "NO_AUTH" and authorizationInfo to undefined if checkAuthorizationStatusAction rejected', () => {
    expect(
      userProcess.reducer(state, {
        type: checkAuthorizationStatusAction.rejected.type,
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      authorizationInfo: undefined,
    });
  });

  it('should update authorizationStatus to "NO_AUTH" and authorizationInfo to undefined if endSessionAction fulfilled', () => {
    expect(
      userProcess.reducer(state, {
        type: endSessionAction.fulfilled.type,
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      authorizationInfo: undefined,
    });
  });

  it('should update authorizationStatus to "NO_AUTH" and authorizationInfo to undefined if endSessionAction rejected', () => {
    expect(
      userProcess.reducer(state, {
        type: endSessionAction.rejected.type,
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      authorizationInfo: undefined,
    });
  });

  it('should update authorizationStatus to "AUTH" and authorizationInfo to given payload if getAuthorizationStatusAction fulfilled', () => {
    expect(
      userProcess.reducer(state, {
        type: getAuthorizationStatusAction.fulfilled.type,
        payload: authInfo,
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
      authorizationInfo: authInfo,
    });
  });
});
