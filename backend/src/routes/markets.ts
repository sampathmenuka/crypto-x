import { Router } from 'express';
import { listMarkets, getCandles } from '../controllers/marketController.js';

const router = Router();

router.get('/',                listMarkets);
router.get('/:symbol/candles', getCandles);

export default router;
