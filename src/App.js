import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home'; 
import LoginForm from './pages/login'; 
import Register from './pages/register';
import ForgotPassword from './pages/forgot';
import AccountPage from './pages/account';
import CartPage from './pages/card';
import OrderConfirmation from './pages/order';
import CompanyPanel from './pages/company';

function App() {
  return (
    <Router> {/* Router ekledik */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/card" element={<CartPage />} />
          <Route path="/order" element={<OrderConfirmation />} />
          <Route path="/company" element={<CompanyPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
