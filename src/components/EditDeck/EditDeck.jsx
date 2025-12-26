import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import './EditDeck.css';

const EditDeck = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deckName, setDeckName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  // Получаем текущее название колоды при загрузке
  useEffect(() => {
    const fetchDeckName = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/decks/${deckId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDeckName(response.data.name);
      } catch (err) {
        console.error('Error fetching deck:', err);
        setError('Failed to load deck. Please try again.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchDeckName();
  }, [deckId]);

  const handleSave = async () => {
    if (!deckName.trim()) {
      setError('Please enter deck name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/decks/${deckId}`, deckName, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/decks'); // Возвращаемся на страницу колод после успешного сохранения
    } catch (err) {
      console.error('Error updating deck:', err);
      setError('Failed to update deck. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/decks');
  };

  if (isFetching) {
    return (
      <div className="edit-deck-loading page-shell">
        <BackButton />
        <div className="panel edit-loading-card">Загружаем колоду...</div>
      </div>
    );
  }

  return (
    <div className="edit-deck-container page-shell">
      <BackButton />
      <div className="edit-deck-card panel fade-in">
        <div className="edit-deck-header">
          <span className="chip">Редактирование</span>
          <h1 className="edit-deck-title">Переименовать колоду</h1>
          <p className="edit-deck-subtitle">
            Обнови название — пусть отражает текущую цель.
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
            placeholder="Введите новое название"
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
            className="save-button"
            onClick={handleSave}
            disabled={!deckName.trim() || isLoading}
          >
            {isLoading ? 'Сохраняем...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDeck;
