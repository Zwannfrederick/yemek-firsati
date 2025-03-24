import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'unu ekleyin
import styles from './order.module.css'; // CSS Modules import ediliyor

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // 5 saniye sonra ana sayfaya yönlendirme
    }, 5000);

    return () => clearTimeout(timer); // Sayfa değiştiğinde temizleme
  }, [navigate]);

  return (
    <div className={styles['order-confirmation']}>
      <h1>Siparişiniz Alındı!</h1>
      <p>Siparişiniz başarıyla oluşturuldu. Teşekkür ederiz!</p>
      <p>30 dakika içinde siparişinizi almayı unutmayın.</p>
      <button onClick={() => navigate("/")} className={styles['home-button']}>
        Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default OrderConfirmation;