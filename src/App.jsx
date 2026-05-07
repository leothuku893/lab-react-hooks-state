import { useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import ProductList, { sampleProducts } from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const categories = ['All', ...new Set(sampleProducts.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All'
    ? sampleProducts
    : sampleProducts.filter(product => product.category === selectedCategory);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <h1>Shopping App</h1>
        <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
      </header>
      
      <label htmlFor="category-filter">Filter by Category: </label>
      <select 
        id="category-filter"
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
        data-testid="category-filter"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      
      <ProductList products={filteredProducts} onAddToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
}

export default App;