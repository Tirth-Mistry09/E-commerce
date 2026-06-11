import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="container">
        <div className="error-message">Order details not found</div>
        <button onClick={() => navigate('/products')} className="primary-btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase.</p>

        <div className="order-details">
          <h2>Order ID: {order._id}</h2>
          <div className="detail-row">
            <span>Status:</span>
            <span className="status-badge">{order.status}</span>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span>Items:</span>
            <span>{order.items.length} item(s)</span>
          </div>
          <div className="detail-row">
            <span>Order Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="order-items">
            <h3>Order Items:</h3>
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <span>{item.productName}</span>
                <span>x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate('/orders')} className="primary-btn">
            View Order History
          </button>
          <button onClick={() => navigate('/products')} className="secondary-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;