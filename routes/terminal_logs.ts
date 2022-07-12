import { Router } from 'express';
import { postLog  } from "../controllers/terminal_log";

const router = Router();

router.post('/', postLog);

export default router;