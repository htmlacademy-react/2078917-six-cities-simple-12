import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { CommentForOffer } from '../../types/comment';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

type AppProps = {
  placeNum: number;
  offers: Offer[];
  comments: CommentForOffer[];
};

export default function App({ placeNum, offers, comments }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root}>
            <Route
              index
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                  <Main placeNum={placeNum} offers={offers} />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Room}
              element={
                <Room
                  offers={offers}
                  offersComments={comments}
                  nearbyOffers={offers.slice(1,3)}
                />
              }
            />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
