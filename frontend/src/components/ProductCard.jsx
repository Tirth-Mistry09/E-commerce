import React, { useState } from 'react';
import api from '../api/axios';

const ProductCard = ({ product, onAddToCart }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      await api.post('/cart/add', {
        productId: product._id,
        quantity: 1
      });
      
      setMessage('✓ Added to cart');
      if (onAddToCart) {
        onAddToCart();
      }
      
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('✗ Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="add-to-cart-btn"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
        {message && <p className={`message ${message.startsWith('✗') ? 'error' : 'success'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default ProductCard;