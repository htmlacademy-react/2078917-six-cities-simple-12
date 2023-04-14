import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';

export default function NotFound(): JSX.Element {
  return (
    <div className='page page--gray page--main'>
      <Helmet>
        <title>Page not found</title>
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

      <h2>Page not Found</h2>
    </div>
  );
}
