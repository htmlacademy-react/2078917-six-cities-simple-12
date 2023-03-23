import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';

const placeNum = 315;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      placeNum = {placeNum}
      offers = {offers}
      comments = {comments}
    />
  </React.StrictMode>
);
