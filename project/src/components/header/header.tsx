import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { endSessionAction } from '../../store/api-actions';
import Logo from '../logo/logo';
import { memo } from 'react';
import { getAuthorizationInfo } from '../../store/user-process/selectors';

function Header(): JSX.Element {

  const userInfo = useAppSelector(getAuthorizationInfo);

  const dispatch = useAppDispatch();

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              {userInfo && (
                <>
                  <li className='header__nav-item user'>
                    <div className='header__nav-profile'>
                      <div className='header__avatar-wrapper user__avatar-wrapper'>
                        <img
                          src={userInfo.avatarUrl}
                          alt='User avatar'
                        />
                      </div>
                      <span className='header__user-name user__name'>
                        {userInfo.email}
                      </span>
                    </div>
                  </li>
                  <li className='header__nav-item'>
                    <Link
                      to="/"
                      className='header__nav-link'
                      onClick={(evt) => {
                        dispatch(endSessionAction());
                        evt.preventDefault();
                      }}
                      data-testid='signOut'
                    >
                      <span className='header__signout'>Sign out</span>
                    </Link>
                  </li>
                </>
              )}
              {!userInfo && (
                <li className='header__nav-item user'>
                  <Link
                    className='header__nav-link header__nav-link--profile'
                    to='/login'
                    data-testid='signIn'
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__login'>Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
