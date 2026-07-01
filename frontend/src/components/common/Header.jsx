import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="header-brand">📄 Резюме и письма</NavLink>
        <nav className="header-nav">
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/resumes">Резюме</NavLink>
          <NavLink to="/coverletters">Письма</NavLink>
          <NavLink to="/templates">Шаблоны</NavLink>
          <NavLink to="/analysis">Анализ</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;