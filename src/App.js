import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import DecksPage from './components/DecksPage/DecksPage';
import CreateDeck from './components/CreateDeck/CreateDeck';
import FlipCards from './components/FlipCards/FlipCards';
import ChatPage from './components/ChatPage/ChatPage';
import Rating from './components/Rating/Rating';
import HomePage from './components/HomePage/HomePage';
import EditDeck from './components/EditDeck/EditDeck';

const isAuthenticated = () => {
  return Boolean(
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('username')
  );
};

const RequireAuth = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const RequireGuest = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/Home" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequireGuest><Home /></RequireGuest>} />
        <Route path="/auth" element={<RequireGuest><Auth /></RequireGuest>} />       {/* Регистрация */}
        <Route path="/signin" element={<RequireGuest><SignIn /></RequireGuest>} />   {/* Авторизация */}
        <Route path="/decks" element={<RequireAuth><DecksPage /></RequireAuth>} />
        <Route path="/create-deck" element={<RequireAuth><CreateDeck /></RequireAuth>} />
        <Route path="/flip-cards/:deckId" element={<RequireAuth><FlipCards /></RequireAuth>} />
        <Route path="/Home" element={<RequireAuth><HomePage /></RequireAuth>} /> 
        <Route path="/chat" element={<RequireAuth><ChatPage /></RequireAuth>} />
        <Route path="/EditDeck" element={<RequireAuth><EditDeck /></RequireAuth>} />
        <Route path="/rating" element={<RequireAuth><Rating /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
