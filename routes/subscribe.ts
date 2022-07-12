import { Router } from 'express';
import { subscribe } from "../controllers/subscribe";
const router = Router();
router.get('/', subscribe);
export default router;