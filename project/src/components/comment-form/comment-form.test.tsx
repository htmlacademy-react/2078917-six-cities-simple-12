import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import CommentForm from './comment-form';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { ApiRoute } from '../../const';
import { Action } from 'redux';
import { State } from '../../types/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { getFakeComments } from '../../utils/mock';

const fakeStore = {
  dispatch(arg: ActionCreatorWithPayload<string | null, string>): void {
    // do nothing.
  },
};
jest.mock('../../store/index', () => fakeStore);// Stub action "setError" in interceptor.

const api = createAPI();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const offerId = 1;

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        isCommentSent: false,
        isCommentSending: false,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <CommentForm offerId={1} />
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toHaveTextContent(/Submit/i);
    expect(screen.getByTestId('submit')).toBeDisabled();
    expect(screen.getByTestId('commentText')).not.toBeDisabled();
    expect(screen.getByTestId('commentText')).toHaveTextContent('');

    const stars = screen.getAllByRole('radio');
    stars.forEach((star) => expect(star).not.toBeChecked());
    stars.forEach((star) => expect(star).not.toBeDisabled());
  });

  it('should enable submit button when user fill comment and rating', async () => {
    const store = mockStore({
      DATA: {
        isCommentSent: false,
        isCommentSending: false,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <CommentForm offerId={1} />
        </HelmetProvider>
      </Provider>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(
        screen.getByTestId('commentText'),
        '123456qwer123456qwer123456qwer123456qwer123456qwer'
      );
    });

    expect(screen.getByTestId('commentText')).toHaveTextContent(
      /123456qwer123456qwer123456qwer123456qwer123456qwer/i
    );

    expect(screen.getByTestId('submit')).toBeDisabled();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('star-4'));
    });

    expect(screen.getByTestId('star-4')).toBeChecked();

    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  it('should disable form when comment is sending', () => {
    const store = mockStore({
      DATA: {
        isCommentSent: false,
        isCommentSending: true,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <CommentForm offerId={1} />
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByTestId('commentText')).toBeDisabled();
    expect(screen.getByTestId('submit')).toBeDisabled();

    const stars = screen.getAllByRole('radio');
    stars.forEach((star) => expect(star).toBeDisabled());
  });

  it('should call actions when user submit form', async () => {

    mockApi
      .onPost(ApiRoute.Comments.replace('{offerId}', String(offerId)))
      .reply(200, getFakeComments());

    const store = mockStore({
      DATA: {
        isCommentSent: false,
        isCommentSending: false,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <CommentForm offerId={offerId} />
        </HelmetProvider>
      </Provider>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(
        screen.getByTestId('commentText'),
        '123456qwer123456qwer123456qwer123456qwer123456qwer'
      );
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('star-4'));
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('submit'));
    });

    const actions = store.getActions();
    const actionsTypes = actions.map((a) => a.type);
    expect(actionsTypes).toEqual([
      'data/sendComment/pending',
      'data/sendComment/fulfilled',
    ]);
  });
});
