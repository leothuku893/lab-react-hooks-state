function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div data-testid={`product-${product.id}`}>
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button 
        onClick={handleAddToCart}
        data-testid={`add-to-cart-${product.id}`}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;  // Make sure this line exists!