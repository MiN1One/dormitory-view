import { useTranslation } from 'react-i18next';

import './Header.scss';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <main className="header__main">

      </main>
      <section className="header__popular">

      </section>
      <section className="header__cities">

      </section>
      <section className="header__features">

      </section>
    </header>
  );
};

export default Header;