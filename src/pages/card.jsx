import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './card.module.css';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className={styles['cart-item']}>
      {/* Firma Bilgileri */}
      <div className={styles['cart-item-company']}>
        <img src={item.companyPhoto} alt={item.company} className={styles['company-photo']} />
        <span className={styles['company-name']}>{item.company}</span>
      </div>

      {/* Menü Bilgileri */}
      <h3 className={styles['cart-item-name']}>{item.name}</h3>
      <p className={styles['cart-item-details-text']}>{item.details}</p>

      {/* Menü İçeriği */}
      <ul className={styles['menu-items']}>
        {item.menuItems.map((menuItem, index) => (
          <li key={index} className={styles['menu-item']}>{menuItem}</li>
        ))}
      </ul>

      {/* Fiyatlandırma ve Adet Kontrolü */}
      <p className={styles['cart-item-price']}>{item.price} TL</p>
      <div className={styles['cart-item-quantity']}>
        <button onClick={() => updateQuantity(item.id, -1)} className={styles['quantity-button']}>-</button>
        <span className={styles['quantity-value']}>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, 1)} className={styles['quantity-button']}>+</button>
      </div>

      {/* Kaldır Butonu */}
      <button onClick={() => removeItem(item.id)} className={styles['remove-button']}>Kaldır</button>
    </div>
  );
};

const CartPage = () => {
  const [cart, setCart] = useState([
    { 
      id: 1, name: 'Pizza Menüsü', company: 'Pizza Dükkanı',
      companyPhoto: '/company-logos/Pizza.jpg',
      menuItems: ['Mozzarella Pizza', 'Sarımsaklı Ekmek', 'Kutu Kola'],
      price: 200, quantity: 1
    },
    { 
      id: 2, name: 'Kebap Menüsü', company: 'Kebapçı Mehmet',
      companyPhoto: '/company-logos/Kebap.png',
      menuItems: ['Adana Kebap', 'Şalgam Suyu', 'Acılı Ezme', 'Lavaş Ekmek'],
      price: 250, quantity: 1
    }
  ]);

  const navigate = useNavigate();

  const updateQuantity = useCallback((id, amount) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const handleOrderComplete = () => {
    if (cart.length > 0) {
      navigate("/order");
    }
  };

  return (
    <div className={styles['container-fluid']}>
      <nav className={styles['navbar']}>
        <h1 className={styles['navbar-title']}>Yemek Fırsatı</h1>
      </nav>

      <main className={styles['main-content']}>
        <h2 className={styles['cart-title']}>Sepetinizdeki Ürünler</h2>
        <div className={styles['cart-items']}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
            ))
          ) : (
            <p className={styles['empty-cart-message']}>Sepetiniz boş.</p>
          )}
        </div>

        <div className={styles['cart-summary']}>
          <h3 className={styles['total-price']}>Toplam Tutar: {totalPrice} TL</h3>
          <button className={styles['order-button']} onClick={handleOrderComplete} disabled={cart.length === 0}>
            Siparişi Tamamla
          </button>
        </div>

        <div className={styles['return-home']}>
          <Link to="/" className={styles['home-link']}>Ana Sayfaya Dön</Link>
        </div>
      </main>

      <footer className={styles['footer']}>
        <p>İletişim: info@example.com</p>
      </footer>
    </div>
  );
};

export default CartPage;
