import ProductCard from './ProductCard';  // Make sure path is correct

export const sampleProducts = [
  { id: 1, name: 'Apple', category: 'Fruits', price: 1.99 },
  { id: 2, name: 'Bread', category: 'Bakery', price: 2.49 },
  { id: 3, name: 'Milk', category: 'Dairy', price: 3.99 },
  { id: 4, name: 'Cheese', category: 'Dairy', price: 5.99 },
];

function ProductList({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div data-testid="product-list">
        <h2>Shopping List</h2>
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div data-testid="product-list">
      <h2>Shopping List</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;  // Make sure this line exists!