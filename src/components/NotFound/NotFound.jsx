import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found page-shell">
      <div className="not-found-card panel fade-in">
        <span className="chip">404</span>
        <h1>Страница потерялась</h1>
        <p>Такого адреса нет. Проверь ссылку или вернись назад.</p>
        <Link to="/" className="not-found-home btn-primary">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
