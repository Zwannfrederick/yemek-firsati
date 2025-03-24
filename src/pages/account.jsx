import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './account.module.css'; // CSS Modules import ediliyor

const AccountPage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+90 555 123 4567',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Yeni bilgiler:', userInfo);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles['account-container']}>
      <div className={styles['account-card']}>
        <h2 className={styles['account-title']}>Hesabım</h2>
        <div className={styles['account-info']}>
          {isEditing ? (
            <>
              <p>
                <strong>Ad:</strong>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className={styles['edit-input']}
                />
              </p>
              <p>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className={styles['edit-input']}
                />
              </p>
              <p>
                <strong>Telefon:</strong>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  className={styles['edit-input']}
                />
              </p>
            </>
          ) : (
            <>
              <p><strong>Ad:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Telefon:</strong> {userInfo.phone}</p>
            </>
          )}
        </div>
        <div className={styles['account-buttons']}>
          {isEditing ? (
            <button className={styles['save-button']} onClick={handleSave}>Kaydet</button>
          ) : (
            <button className={styles['edit-button']} onClick={() => setIsEditing(true)}>Profili Düzenle</button>
          )}
          <button className={styles['logout-button']} onClick={handleLogout}>Çıkış Yap</button>
        </div>
      </div>
      <button onClick={() => navigate("/")} className={styles['hbutton']}>
        Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default AccountPage;