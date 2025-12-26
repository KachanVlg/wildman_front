import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Стили можно создать отдельно

const HomePage = () => {
  const navigate = useNavigate();
  
  // Получаем username из localStorage (где мы его сохранили после входа)
  const username = localStorage.getItem('username') || 'Пользователь';

  const handleShowDecks = () => {
    navigate('/decks');
  };

  const handleShowChat = () => {
    navigate('/chat');
  };

  const handleLogout = async () => {
    try {
      // Отправляем запрос на выход
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      // Очищаем данные пользователя
      localStorage.removeItem('username');
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      
      // Перенаправляем на страницу входа
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div className="home-container page-shell">
      <div className="home-header panel fade-in">
        <div className="home-header-text">
          <h1 className="welcome-message">Здравствуйте, {username}!</h1>
          <p className="home-tagline">
            Выбери режим тренировки и прокачивай словарь сегодня.
          </p>
        </div>
      </div>
      
      <div className="buttons-container">
        <button 
          onClick={handleShowDecks}
          className="home-btn primary"
        >
          Колоды и карточки
        </button>
        
        <button 
          onClick={handleShowChat}
          className="home-btn secondary"
        >
          Чат-тренер
        </button>
        
        <button 
          onClick={handleLogout}
          className="home-btn ghost"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default HomePage;
