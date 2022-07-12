import { Router } from 'express';
import { getLine, getLines } from '../controllers/line';
const router = Router();
router.get('/', getLines);
router.get('/:id', getLine);

export default router;