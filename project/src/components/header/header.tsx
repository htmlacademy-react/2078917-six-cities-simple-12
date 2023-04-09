import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import Logo from '../logo/logo';

export default function Header(): JSX.Element {
  const userInfo = useAppSelector((state) => state.authorizationInfo);

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li className='header__nav-item user'>
                {userInfo && (
                  <div className='header__nav-profile'>
                    <div className='header__avatar-wrapper user__avatar-wrapper'>
                      <img src={userInfo.avatarUrl} alt='User avatar' />
                    </div>
                    <span className='header__user-name user__name'>
                      {userInfo.email}
                    </span>
                  </div>
                )}
                {!userInfo && (
                  <Link
                    className='header__nav-link header__nav-link--profile'
                    to='/login'
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__login'>Sign in</span>
                  </Link>
                )}
              </li>
              {userInfo && (
                <li className='header__nav-item'>
                  <Link
                    className='header__nav-link'
                    to='/logout'
                  >
                    <span className='header__signout'>Sign out</span>
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
