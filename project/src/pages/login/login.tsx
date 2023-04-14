import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { store } from '../../store';
import { getAuthorizationStatusAction } from '../../store/api-actions';
import { Credentials } from '../../types/user';

export default function Login(): JSX.Element {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

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
              onSubmit={(evt: React.FormEvent<HTMLFormElement>) => {
                store.dispatch(
                  getAuthorizationStatusAction(credentials)
                );
                evt.preventDefault();
              }}
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
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setCredentials({
                      ...credentials,
                      email: evt.currentTarget.value,
                    })}
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
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setCredentials({
                      ...credentials,
                      password: evt.currentTarget.value,
                    })}
                />
              </div>
              <button
                className='login__submit form__submit button'
                type='submit'
              >
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <a
                className='locations__item-link'
                href='/'
              >
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
