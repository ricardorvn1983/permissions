import { Router } from 'express';
import { deletePermission, getPermission, getPermissions, postPermission, putPermission, getFilterPermissions } from '../controllers/permission';
import { compress } from '../middlewares/compression';
import { appliedCache } from '../middlewares/route_cache';
const router = Router();
/* function parseDate (req, res, next) {
    
    // req.query.create_date = "";
    next();
} */

// router.get('/', [appliedCache(300)], getPermissions);
router.get('/', getPermissions);
router.get('/search', getFilterPermissions);
router.get('/:id', getPermission);
router.post('/', postPermission );
router.put('/:id', putPermission);
router.delete('/:id', deletePermission);

export default router;