import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import './Auth.css';

const Auth = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const extractToken = (raw) => {
    if (!raw) {
      return '';
    }
    try {
      const parsed = JSON.parse(raw);
      return parsed.token || parsed.accessToken || parsed.authToken || '';
    } catch (e) {
      const trimmed = raw.trim();
      if (trimmed.includes(' ') || trimmed.toLowerCase() === 'ok' || trimmed.toLowerCase() === 'success') {
        return '';
      }
      return trimmed;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Sending request to /api/login');
      const response = await fetch(apiUrl('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.text();
      console.log('Response:', response.status, data);

      if (!response.ok) {
        throw new Error(data || 'Login failed');
      }

      const token = extractToken(data);
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('authToken', token);
      }
      localStorage.setItem('username', formData.username);

      window.location.href = '/Home';
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container page-shell">
      <div className="auth-panel panel fade-in">
        <div className="auth-header">
          <span className="chip">Вход в игру</span>
          <h1 className="auth-title">С возвращением!</h1>
          <p className="auth-subtitle">
            Подключайся к своим колодам и продолжай тренировку.
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input-field"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="auth-button btn-primary" disabled={isLoading}>
            {isLoading ? 'Входим...' : 'Войти'}
          </button>
        </form>
        <div className="auth-switch">
          Нет аккаунта? <Link to="/signin">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
