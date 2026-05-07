// App.jsx - Shopping Cart Application
import React, { useState } from 'react';
import './App.css';

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

      <div data-testid="product-list">
        <h2>Shopping List</h2>
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} data-testid={`product-${product.id}`}>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <button
                  data-testid={`add-to-cart-${product.id}`}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div data-testid="cart">
        <h2>Shopping Cart</h2>
        <div data-testid="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} data-testid={`cart-item-${item.id}`}>
                  <span>{item.name}</span>
                  <span> - ${item.price}</span>
                  <div>
                    <button
                      data-testid={`decrease-qty-${item.id}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span data-testid={`item-quantity-${item.id}`}>{item.quantity}</span>
                    <button
                      data-testid={`increase-qty-${item.id}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      data-testid={`remove-item-${item.id}`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div data-testid="cart-total">
                <strong>Total: ${getTotalPrice()}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;