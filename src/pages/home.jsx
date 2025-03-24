import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // React Icons'dan ikonlar
import styles from './home.module.css'; // CSS Modules import ediliyor

const Home = () => {
  const [focusedItem, setFocusedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [foodItems, setFoodItems] = useState([
    { 
      id: 1,
      name: 'Pizza Menüsü', 
      company: 'Pizza Dükkanı', 
      details: 'Lezzetli bir pizza menüsü, yanında nefis atıştırmalıklar.', 
      companyPhoto: '/company-logos/Pizza.jpg',
      menuPhoto: '/menu-photos/Pizza.jpg', 
      menuItems: ['Mozzarella Pizza', 'Sarımsaklı Ekmek', 'Kutu Kola'],
      price: 200,
      quantity: 0,
      delivery: 'Gel Al'
    },
    { 
      id: 2,
      name: 'Kebap Menüsü', 
      company: 'Kebapçı Mehmet', 
      details: 'Enfes kebap lezzetleri, yanında tam kıvamında mezeler.', 
      companyPhoto: '/company-logos/Kebap.png',
      menuPhoto: '/menu-photos/Kebap.jpg', 
      menuItems: ['Adana Kebap', 'Şalgam Suyu', 'Acılı Ezme', 'Lavaş Ekmek'],
      price: 250,
      quantity: 0,
      delivery: 'Gel Al'
    },
    { 
      id: 3,
      name: 'Hamburger Menüsü', 
      company: 'Burger House', 
      details: 'Bol malzemeli hamburger menüsü, atıştırmalıklarla birlikte.', 
      companyPhoto: '/company-logos/Hamburger.png',
      menuPhoto: '/menu-photos/Hamburger.jpg', 
      menuItems: ['Cheeseburger', 'Patates Kızartması', 'Soğuk İçecek'],
      price: 150,
      quantity: 0,
      delivery: 'Gel Al'
    },
    { 
      id: 4,
      name: 'Lahmacun Menüsü', 
      company: 'Anadolu Sofrası', 
      details: 'İncecik hamur ve bol malzemeli lahmacun keyfi.', 
      companyPhoto: '/company-logos/Lahmacun.png',
      menuPhoto: '/menu-photos/Lahmacun.jpg', 
      menuItems: ['Lahmacun', 'Ayran', 'Bol Yeşillik'],
      price: 160,
      quantity: 0,
      delivery: 'Gel Al'
    },
    { 
      id: 5,
      name: 'Çorba Menüsü', 
      company: 'Omtel', 
      details: 'Sıcak, klasik çorba menüsü, yanında taze ekmek ve ayran.', 
      companyPhoto: '/company-logos/Omtel.png',
      menuPhoto: '/menu-photos/Mercimek.jpg', 
      menuItems: ['Mercimek Çorbası', 'Taze Ekmek', 'Ayran'],
      price: 80,
      quantity: 0,
      delivery: 'Gel Al'
    },
    { 
      id: 6,
      name: 'Poğaça Menüsü', 
      company: 'Pastane Lezzetleri', 
      details: 'Farklı poğaçalar ve yanında sıcak içecekler.', 
      companyPhoto: '/company-logos/Pastane.png',
      menuPhoto: '/menu-photos/Pogaca.jpg', 
      menuItems: ['Zeytinli Poğaça', 'Peynirli Poğaça', 'Çay'],
      price: 80,
      quantity: 0,
      delivery: 'Gel Al'
    }
  ]);
  
  const foodRefs = useRef([]);
  const hoverTimeout = useRef(null);
  const isHovered = useRef(false); // To track hover state
  const navigate = useNavigate();

  useEffect(() => {
    // Only scroll into view if the item is focused and not hovered
    if (focusedItem !== null && foodRefs.current[focusedItem] && !isHovered.current) {
      hoverTimeout.current = setTimeout(() => {
        const item = foodRefs.current[focusedItem];
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1000);
    }

    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, [focusedItem]);

  const updateQuantity = (id, change) => {
    setFoodItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      )
    );
  };

  const handleOrder = (item) => {
    if (item.quantity === 0) {
      alert("Sipariş vermek için en az 1 adet seçmelisiniz.");
    } else {
      navigate('/login');
    }
  };

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['container-fluid']}>
      {/* Navbar */}
      <nav className={styles['navbar']}>
        <div className={styles['navbar-item']}>
          <a href="/account" className={styles['navbar-link']}>
            <FaUser className={styles['navbar-icon']} />
            <span>Hesabım</span>
          </a>
        </div>
        <h1 className={styles['navbar-title']}>Yemek Fırsatı</h1>
        <div className={styles['navbar-item']}>
          <a href="/card" className={styles['navbar-link']}>
            <FaShoppingCart className={styles['navbar-icon']} />
            <span>Sepetim</span>
          </a>
        </div>
      </nav>

      {/* Arama Çubuğu */}
      <div className={styles['search-bar-container']}>
        <input 
          type="text" 
          placeholder="Menü ara..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles['search-bar']}
        />
      </div>

      <main className={styles['main-content']}>
        <div className={styles['food-list']}>
          {filteredItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (foodRefs.current[index] = el)}
              className={`${styles['food-item']} ${focusedItem === index ? styles['focused'] : ''}`}
              onMouseEnter={() => { 
                setFocusedItem(index); 
                isHovered.current = true; // Set hover state
              }}
              onMouseLeave={() => { 
                setFocusedItem(null); 
                isHovered.current = false; // Reset hover state
              }}
            >
              <div className={styles['company-photo-container']}>
                <img src={item.companyPhoto} alt={item.company} className={styles['company-photo']} />
              </div>
              <h3>{item.name}</h3>
              <p>{item.company} tarafından hazırlanmıştır.</p>
              <p className={styles['cart-item-price']}>{item.price} TL</p>
              <p><strong>Teslim Şekli:</strong> {item.delivery}</p> {/* Teslim şekli eklendi */}
              <div className={`${styles['food-details']} ${focusedItem === index ? styles['show'] : ''}`}>
                <h4>Menü İçindekiler:</h4>
                <ul className={styles['menu-items']}>
                  {item.menuItems.map((menuItem, idx) => (
                    <li key={idx}>{menuItem}</li>
                  ))}
                </ul>
                <p>{item.details}</p>
                <div className={styles['menu-photo-container']}>
                  <img src={item.menuPhoto} alt={item.name} className={styles['menu-photo']} />
                </div>
              </div>
              <div className={styles['quantity-controls']}>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button className={styles['order-btn']} onClick={() => handleOrder(item)}>Sipariş Ver</button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles['footer']}>
        <p>İletişim: info@example.com</p>
      </footer>
    </div>
  );
};

export default Home;