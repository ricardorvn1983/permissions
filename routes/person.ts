import { Router } from 'express';
import { getPerson, getPersons } from "../controllers/person";
import { compress } from '../middlewares/compression';
import { appliedCache } from '../middlewares/route_cache';
// import { cache } from "../middlewares/route_cache";

const router = Router();
router.get('/', [appliedCache(300), compress], getPersons);
router.get('/:id',appliedCache(300), getPerson);
export default router;