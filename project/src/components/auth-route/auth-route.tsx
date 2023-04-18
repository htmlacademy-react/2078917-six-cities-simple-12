import { Navigate } from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type AuthRouteProps = {
  children: JSX.Element;
};

export default function AuthRoute({
  children,
}: AuthRouteProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus !== AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Root} />
  );
}
