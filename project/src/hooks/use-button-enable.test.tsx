import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import useButtonEnable from './use-button-enable';

const mockStore = configureMockStore();

describe('Hook: useButtonEnable', () => {
  it('should return false when empty comment and rating', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isCommentSending: false,
      },
    });

    const userComment = '';
    const userRating = 0;

    const { result } = renderHook(
      () => useButtonEnable(userComment, userRating),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    const isButtonEnabled = result.current;

    expect(isButtonEnabled).toBe(false);
  });

  it('should return false when comment is sending', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isCommentSending: true,
      },
    });

    const userComment = 'qwerty1234qwerty1234qwerty1234qwerty1234qwerty1234';
    const userRating = 1;

    const { result } = renderHook(
      () => useButtonEnable(userComment, userRating),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    const isButtonEnabled = result.current;

    expect(isButtonEnabled).toBe(false);
  });

  it('should return true when comment and rating are filled', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isCommentSending: false,
      },
    });

    const userComment = 'qwerty1234qwerty1234qwerty1234qwerty1234qwerty1234';
    const userRating = 1;

    const { result } = renderHook(
      () => useButtonEnable(userComment, userRating),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    const isButtonEnabled = result.current;

    expect(isButtonEnabled).toBe(true);
  });

});
