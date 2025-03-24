import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './company.module.css'; // CSS Modules import ediliyor

const CompanyPanel = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Ahmet Yılmaz", items: ["Pizza Menüsü", "Kola"], total: 70, status: "Hazırlanıyor" },
    { id: 2, customer: "Mehmet Demir", items: ["Kebap Menüsü", "Ayran"], total: 90, status: "Teslim Edildi" },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Pizza Menüsü',
      company: 'Pizza Dünyası',
      details: 'Çeşitli pizzalar ve yanında içecekler.',
      companyPhoto: '/company-logos/Pizza.png',
      menuPhoto: '/menu-photos/Pizza.jpg',
      menuItems: ['Margarita', 'Pepperoni', 'Kola'],
      price: 50,
      quantity: 0,
      delivery: 'Gel Al',
    },
    {
      id: 2,
      name: 'Kebap Menüsü',
      company: 'Kebapçı Lezzetleri',
      details: 'Çeşitli kebap seçenekleri ve yanında ayran.',
      companyPhoto: '/company-logos/Kebap.png',
      menuPhoto: '/menu-photos/Kebap.jpg',
      menuItems: ['Adana Kebap', 'Urfa Kebap', 'Ayran'],
      price: 70,
      quantity: 0,
      delivery: 'Gel Al',
    },
  ]);

  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    company: "",
    details: "",
    companyPhoto: "",
    menuPhoto: "",
    menuItems: "",
    price: "",
    delivery: "Gel Al",
  });

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      const newItem = {
        id: menuItems.length + 1,
        ...newMenuItem,
        menuItems: newMenuItem.menuItems.split(',').map(item => item.trim()), // Virgülle ayrılmış öğeleri diziye çevir
      };
      setMenuItems([...menuItems, newItem]);
      setNewMenuItem({
        name: "",
        company: "",
        details: "",
        companyPhoto: "",
        menuPhoto: "",
        menuItems: "",
        price: "",
        delivery: "Gel Al",
      });
    }
  };

  const handleToggleDeliveryStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: order.status === "Teslim Edildi" ? "Hazırlanıyor" : "Teslim Edildi",
            }
          : order
      )
    );
  };

  return (
    <>
    {/* Navbar */}
    <nav className={styles['navbar']}>
      <h1 className={styles['panel-title']}>Şirket Paneli</h1>
    </nav>
    <div className={styles['company-panel-container']}>
      {/* Siparişler Bölümü */}
      <section className={styles['orders-section']}>
        <h2>Siparişler</h2>
        <div className={styles['orders-list']}>
          {orders.map((order) => (
            <div key={order.id} className={styles['order-card']}>
              <p><strong>Müşteri:</strong> {order.customer}</p>
              <p><strong>Siparişler:</strong> {order.items.join(", ")}</p>
              <p><strong>Toplam:</strong> {order.total} TL</p>
              <p><strong>Durum:</strong> {order.status}</p>
              <button
                className={`${styles['assign-button']} ${order.status === "Teslim Edildi" ? styles['delivered'] : styles['not-delivered']}`}
                onClick={() => handleToggleDeliveryStatus(order.id)}
              >
                {order.status === "Teslim Edildi" ? "Teslim Alındı" : "Teslim Alınmadı"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Menü Yönetimi Bölümü */}
      <section className={styles['menu-section']}>
        <h2>Menü Yönetimi</h2>
        <div className={styles['menu-list']}>
          {menuItems.map((item) => (
            <div key={item.id} className={styles['menu-item']}>
              <p><strong>{item.name}</strong> - {item.price} TL</p>
              <button className={styles['delete-button']}>Sil</button>
            </div>
          ))}
        </div>
        <div className={styles['add-menu-item']}>
          <table>
            <thead>
              <tr>
                <th>Menü Adı</th>
                <th>Şirket Adı</th>
                <th>Detaylar</th>
                <th>Şirket Fotoğrafı</th>
                <th>Menü Fotoğrafı</th>
                <th>Menü Öğeleri</th>
                <th>Fiyat</th>
                <th>Teslimat Türü</th>
                <th>Ekle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Menü Adı"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Şirket Adı"
                    value={newMenuItem.company}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, company: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Detaylar"
                    value={newMenuItem.details}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, details: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Şirket Fotoğrafı URL"
                    value={newMenuItem.companyPhoto}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, companyPhoto: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Menü Fotoğrafı URL"
                    value={newMenuItem.menuPhoto}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, menuPhoto: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Menü Öğeleri (Virgülle Ayır)"
                    value={newMenuItem.menuItems}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, menuItems: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Fiyat"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    value={newMenuItem.delivery}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, delivery: e.target.value })}
                  >
                    <option value="Gel Al">Gel Al</option>
                    <option value="Teslimat">Teslimat</option>
                  </select>
                </td>
                <td>
                  <button onClick={handleAddMenuItem}>Ekle</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ana Sayfaya Dön Butonu */}
      <div className={styles['return-home']}>
        <Link to="/" className={styles['home-link']}>Ana Sayfaya Dön</Link>
      </div>
    </div>

    <footer className={styles['footer']}>
      <p>İletişim: info@example.com</p>
    </footer>
    </>
  );
};

export default CompanyPanel;
