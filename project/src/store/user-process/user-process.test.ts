import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/store';
import { checkAuthorizationStatusAction } from '../api-actions';
import { userProcess } from './user-process';
import { image, internet, datatype, name } from 'faker';

describe('Reducer: UserProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authorizationInfo: undefined,
    };
  });

  const authInfo = {
    avatarUrl: image.imageUrl(),
    email: internet.email(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.findName(),
    token: 'tokenid',
  };

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      authorizationInfo: undefined,
    });
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


});
