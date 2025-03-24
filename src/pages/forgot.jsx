import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './forgot.module.css'; // CSS Modules import ediliyor

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("E-posta gönderildi:", email);
  };

  return (
    <div className={styles['forgot-password-container']}>
      <div className={styles['forgot-password-form']}>
        <h3 className={styles['forgot-password-title']}>Şifremi Unuttum</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles['input-group']}>
            <label className={styles['input-label']}>E-posta</label>
            <input
              type="email"
              className={styles['input-field']}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>
          <button type="submit" className={styles['forgot-password-button']}>
            Şifreyi Sıfırla
          </button>
        </form>
        <div className={`${styles['text-center']} ${styles['mt-3']}`}>
          <Link to="/login" className={styles['main-link']}>Giriş Yap Sayfasına Dön</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;