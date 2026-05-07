// App.jsx - Shopping Cart Application
import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const initialProducts = [
  { id: 1, name: 'Apple', category: 'Fruits', price: 1.99 },
  { id: 2, name: 'Bread', category: 'Bakery', price: 2.49 },
  { id: 3, name: 'Milk', category: 'Dairy', price: 3.99 },
  { id: 4, name: 'Cheese', category: 'Dairy', price: 5.99 },
];

function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    // Show confirmation message
    setMessage(`${product.name} is in your cart!`);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const filteredProducts = categoryFilter === 'All'
    ? products
    : products.filter(product => product.category === categoryFilter);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <h1>Shopping App</h1>
        <button 
          data-testid="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
        </button>
      </header>

      <label htmlFor="category-filter">Filter by Category: </label>
      <select
        id="category-filter"
        data-testid="category-filter"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Bakery">Bakery</option>
        <option value="Dairy">Dairy</option>
      </select>

      {/* Confirmation Message */}
      {message && (
        <div data-testid="cart-message" className="cart-message">
          {message}
        </div>
      )}

      <ProductList products={filteredProducts} onAddToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
}

export default App;