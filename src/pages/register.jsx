import React, { useState } from "react";
import styles from './register.module.css'; // CSS Modules import ediliyor
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS'ini ekleyin

const Register = () => {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <h3 className={styles['login-title']}>Kayıt Ol</h3>
        <div className={styles['tab-buttons']}>
          <button
            className={`${styles['tab-button']} ${activeTab === "customer" ? styles['active'] : ''}`}
            onClick={() => setActiveTab("customer")}
          >
            Müşteri Kaydı
          </button>
          <button
            className={`${styles['tab-button']} ${activeTab === "business" ? styles['active'] : ''}`}
            onClick={() => setActiveTab("business")}
          >
            İşletme Kaydı
          </button>
        </div>
        <div className={styles['form-container']}>
          {activeTab === "customer" && <CustomerForm />}
          {activeTab === "business" && <BusinessForm />}
        </div>
        <div className="text-center mt-3">
          <Link to="/login" className={styles['main-link']}>Giriş Yap Sayfasına Dön</Link>
        </div>
      </div>
    </div>
  );
};

const CustomerForm = () => {
  return (
    <form>
      <div className={styles['input-group']}>
        <label className={styles['input-label']}>Ad Soyad</label>
        <input type="text" className={styles['input-field']} />
      </div>
      <div className={styles['input-group']}>
        <label className={styles['input-label']}>E-posta</label>
        <input type="email" className={styles['input-field']} />
      </div>
      <button className={styles['login-button']}>Kayıt Ol</button>
    </form>
  );
};

const BusinessForm = () => {
  return (
    <form>
      <div className={styles['input-group']}>
        <label className={styles['input-label']}>Şirket Adı</label>
        <input type="text" className={styles['input-field']} />
      </div>
      <div className={styles['input-group']}>
        <label className={styles['input-label']}>Vergi Numarası</label>
        <input type="text" className={styles['input-field']} />
      </div>
      <button className={styles['login-button']}>Kayıt Ol</button>
    </form>
  );
};

export default Register;