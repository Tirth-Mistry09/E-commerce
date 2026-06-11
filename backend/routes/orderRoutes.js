import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  placeOrder,
  getOrderHistory,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.use(protect);

router.post('/place', placeOrder);
router.get('/history', getOrderHistory);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);

export default router;