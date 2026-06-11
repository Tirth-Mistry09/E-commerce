import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data.cart);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    try {
      const response = await api.put('/cart/update', {
        productId,
        quantity
      });
      setCart(response.data.cart);
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await api.post('/cart/remove', { productId });
      setCart(response.data.cart);
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handlePlaceOrder = async () => {
    if (!cart || cart.items.length === 0) {
      setError('Cart is empty');
      return;
    }

    setPlacing(true);
    try {
      const response = await api.post('/orders/place', {
        shippingAddress: 'Default Address',
        paymentMethod: 'credit_card'
      });
      
      // Navigate to order success page
      navigate('/order-success', { state: { order: response.data.order } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/products')} className="primary-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="cart-wrapper">
        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="quantity-control">
                <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.product._id, parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => handleRemoveItem(item.product._id)}
                className="remove-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(cart.totalPrice * 1.1).toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="place-order-btn"
          >
            {placing ? 'Placing Order...' : 'Place Order'}
          </button>

          <button
            onClick={() => navigate('/products')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;