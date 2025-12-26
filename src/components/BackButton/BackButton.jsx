import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-button"
      onClick={() => navigate(-1)}
    >
      Назад
    </button>
  );
};

export default BackButton;
