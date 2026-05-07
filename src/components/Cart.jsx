function Cart({ cart }) {
  return (
    <div data-testid="cart">
      <h2>Shopping Cart</h2>
      <div data-testid="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index}>
              {item.name} is in your cart.
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;