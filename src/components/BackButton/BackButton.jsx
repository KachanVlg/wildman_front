import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BackButton.css';

const getDefaultTarget = (pathname) => {
  if (pathname.startsWith('/create-deck')) {
    return '/decks';
  }
  if (pathname.startsWith('/EditDeck')) {
    return '/decks';
  }
  if (pathname.startsWith('/flip-cards')) {
    return '/decks';
  }
  if (pathname.startsWith('/decks')) {
    return '/Home';
  }
  if (pathname.startsWith('/rating')) {
    return '/chat';
  }
  if (pathname.startsWith('/chat')) {
    return '/Home';
  }
  return '/';
};

const BackButton = ({ fallback }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const target = fallback || getDefaultTarget(location.pathname);

  return (
    <button
      type="button"
      className="back-button"
      onClick={() => navigate(target, { replace: true })}
    >
      Назад
    </button>
  );
};

export default BackButton;
