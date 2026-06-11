import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/history');
      setOrders(response.data.orders);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (orders.length === 0) {
    return (
      <div className="container">
        <h1>Order History</h1>
        <div className="empty-state">
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Order History</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header" onClick={() => toggleOrderDetails(order._id)}>
              <div className="order-info">
                <h3>Order ID: {order._id.slice(-8)}</h3>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="order-amount">
                <span className="price">${order.totalAmount.toFixed(2)}</span>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <button className="expand-btn">
                {expandedOrder === order._id ? '▼' : '▶'}
              </button>
            </div>

            {expandedOrder === order._id && (
              <div className="order-details">
                <div className="items-section">
                  <h4>Order Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="detail-item">
                      <span>{item.productName}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="info-section">
                  <div className="info-row">
                    <span>Subtotal:</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="info-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="info-row">
                    <span>Tax:</span>
                    <span>${(order.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="info-row total">
                    <span>Total:</span>
                    <span>${(order.totalAmount * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;