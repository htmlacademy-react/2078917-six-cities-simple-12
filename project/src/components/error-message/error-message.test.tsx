import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ErrorMessage from './error-message';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  APP: {
    error: 'error text'
  }
});
const fakeComponent = (
  <Provider store={store}>
    <ErrorMessage />
  </Provider>
);

describe('Component: ErrorMessage', () => {

  it('should render correctly', () => {
    render(fakeComponent);
    expect(screen.getByText(/error text/i)).toBeInTheDocument();
  });
});
