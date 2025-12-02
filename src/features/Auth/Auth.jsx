import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // 'login' или 'register'

  const handleDemoLogin = (role) => {
    setEmail(`${role}@example.com`);
    setPassword('demo123');
    setTimeout(() => {
      alert(`Вход как ${role} (заглушка)`);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <div className="logo">
            <h1>FlightStats</h1>
          </div>
          <p className="logo-subtitle">Система анализа пунктуальности авиарейсов</p>
        </div>

        <form className="login-form">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите ваш пароль"
              required
              disabled={loading}
              minLength="6"
            />
          </div>

          {activeTab === 'login' && (
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Запомнить меня</span>
              </label>
              <button type="button" className="forgot-password">
                Забыли пароль?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : activeTab === 'login' ? (
              'Войти'
            ) : (
              'Зарегистрироваться'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Auth;