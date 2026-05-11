import { Router } from 'express';
import { getBalance, getPortfolio } from '../controllers/portfolioController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/',        getPortfolio);
router.get('/balance', getBalance);

export default router;
