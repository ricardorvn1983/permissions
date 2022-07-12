import { Router } from 'express';
import { getConcepts, getMotives_Concept, getConcept } from '../controllers/concept';

const router = Router();

router.get('/', getConcepts);
router.get('/:cid', getConcept);
router.get('/:cid/motives', getMotives_Concept);

export default router;