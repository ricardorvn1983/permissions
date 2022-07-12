import { Router } from 'express';
import { getMotives } from '../controllers/motive';

const router = Router();

router.get('/', getMotives);

export default router;