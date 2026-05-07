function Cart({ cart }) {
  return (
    <div data-testid="cart">
      <h2>Shopping Cart</h2>
      <div data-testid="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id}>
              <span>{item.name}</span>
              <span> - {item.quantity} {item.quantity === 1 ? 'item' : 'items'}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;