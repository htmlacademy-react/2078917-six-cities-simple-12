import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import HistoryRouter from '../history-router/history-router';
import history from 'history/browser';
import AuthRoute from '../auth-route/auth-route';

export default function App(): JSX.Element {

  return (
    <HelmetProvider>
      <HistoryRouter history={history}>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root}>
            <Route
              index
              element={<Main />}
            />
            <Route
              path={AppRoute.Room}
              element={<Room />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
