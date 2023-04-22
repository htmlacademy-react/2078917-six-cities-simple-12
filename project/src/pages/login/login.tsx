import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { store } from '../../store';
import { getAuthorizationStatusAction } from '../../store/api-actions';
import { setCity } from '../../store/app-process/app-process';
import { Credentials } from '../../types/user';
import { getRandomCity } from '../../utils';

export default function Login(): JSX.Element {

  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    store.dispatch(
      getAuthorizationStatusAction(credentials)
    );
    evt.preventDefault();
  }

  function handleEmailChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      email: evt.currentTarget.value,
    });
  }

  function handlePasswordChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      password: evt.currentTarget.value,
    });
  }

  const cityName = getRandomCity();

  function handleClickCity() {
    dispatch(setCity(cityName));
  }

  return (
    <div className='page page--gray page--login'>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              className='login__form form'
              onSubmit={handleSubmit}
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required
                  value={credentials.email}
                  onChange={handleEmailChange}
                  data-testid='login'
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required
                  value={credentials.password}
                  onChange={handlePasswordChange}
                  data-testid='password'
                />
              </div>
              <button
                className='login__submit form__submit button'
                type='submit'
                data-testid='sign-in'
              >
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link
                className='locations__item-link'
                to='/'
                onClick={handleClickCity}
              >
                <span>{cityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
