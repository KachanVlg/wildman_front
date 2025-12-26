import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import './CreateDeck.css';

const CreateDeck = () => {
  const navigate = useNavigate();
  const [deckName, setDeckName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      setError('Please enter deck name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/decks', 
        { name: deckName }, // Отправляем только имя колоды
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Deck created successfully:', response.data);
      navigate('/decks'); // Перенаправляем на страницу колод
    } catch (err) {
      console.error('Error creating deck:', err);
      setError('Failed to create deck. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/decks');
  };

  return (
    <div className="create-deck-container page-shell">
      <BackButton />
      <div className="create-deck-card panel fade-in">
        <div className="create-deck-header">
          <span className="chip">Новый уровень</span>
          <h1 className="create-deck-title">Создать колоду</h1>
          <p className="create-deck-subtitle">
            Назови колоду так, чтобы она мотивировала учиться каждый день.
          </p>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        <div className="deck-name-section">
          <label htmlFor="deck-name">Название колоды</label>
          <input
            type="text"
            id="deck-name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="input-field"
            placeholder="Например: Сленг и мемы"
          />
        </div>

        <div className="action-buttons">
          <button 
            className="cancel-button"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Отмена
          </button>
          <button 
            className="create-button"
            onClick={handleCreateDeck}
            disabled={!deckName.trim() || isLoading}
          >
            {isLoading ? 'Создаем...' : 'Создать колоду'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
