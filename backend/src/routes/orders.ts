import { Router } from 'express';
import { placeOrder, listOrders, cancelOrder } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.post('/',    placeOrder);
router.get('/',     listOrders);
router.delete('/:id', cancelOrder);

export default router;
