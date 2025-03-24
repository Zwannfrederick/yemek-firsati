import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'; // CSS Modules import ediliyor

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <h2 className={styles['login-title']}>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['input-group']}>
            <label htmlFor="email" className={styles['input-label']}>Email</label>
            <input
              type="email"
              id="email"
              className={styles['input-field']}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="password" className={styles['input-label']}>Şifre</label>
            <input
              type="password"
              id="password"
              className={styles['input-field']}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Buton konteyneri */}
          <div className={styles['button-container']}>
            <button type="submit" className={styles['button']}>
              Giriş Yap
            </button>
          </div>
        </form>
        
        {/* Ortak Konteyner */}
        <div className={styles['link-container']}>
          <Link to="/forgot-password" className={styles['link']}>Şifremi Unuttum</Link>
          <Link to="/register" className={styles['link']}>Yeni Hesap Oluştur</Link>
        </div>

        {/* Ana Sayfaya Dön Butonu */}
        <div className={styles['button-container']}>
          <Link to="/" className={styles['button']}>Ana Sayfaya Dön</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;