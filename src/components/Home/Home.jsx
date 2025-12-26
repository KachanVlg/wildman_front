import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container page-shell">
      <div className="home-hero panel fade-in">
        <div className="home-hero-header">
          <span className="chip">Игровая тренировка слов</span>
          <h1 className="home-title">Добро пожаловать в Wildman</h1>
          <p className="home-subtitle">
            Собирай колоды, прокачивай словарный запас и общайся с ассистентом.
            Формат для школьников и студентов, который реально держит внимание.
          </p>
        </div>

        <div className="home-actions">
          <button className="btn-primary" onClick={() => navigate('/signin')}>
            Начать игру
          </button>
          <button className="btn-secondary" onClick={() => navigate('/auth')}>
            Уже есть аккаунт
          </button>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <h3>Колоды-уровни</h3>
            <p>Собирай свои наборы слов и проходи их как уровни.</p>
          </div>
          <div className="feature-card">
            <h3>Флип-карточки</h3>
            <p>Запоминай быстрее благодаря режиму переворота.</p>
          </div>
          <div className="feature-card">
            <h3>Чат-тренер</h3>
            <p>Диалоги в стиле игры, но с живой практикой.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
