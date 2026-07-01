import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-enter">
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Добро пожаловать в сервис генерации резюме и сопроводительных писем</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>
          Создавайте профессиональные резюме и сопроводительные письма на основе ваших данных и требований вакансий.
        </p>
        <div className="home-grid">
          <Link to="/resumes" className="home-card">
            <h3>📝 Резюме</h3>
            <p>Управление и генерация</p>
          </Link>
          <Link to="/coverletters" className="home-card">
            <h3>✉️ Письма</h3>
            <p>Генерация под вакансию</p>
          </Link>
          <Link to="/templates" className="home-card">
            <h3>📋 Шаблоны</h3>
            <p>Примеры и шаблоны</p>
          </Link>
          <Link to="/analysis" className="home-card">
            <h3>🔍 Анализ</h3>
            <p>Советы по улучшению</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;