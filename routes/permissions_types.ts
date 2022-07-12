import { Router } from 'express';
import { getPermissionsTypes, getPermissionType, getPermissionsTypes_Concepts  } from '../controllers/permissions_type';

const router = Router();

router.get('/', getPermissionsTypes);
router.get('/:ptype', getPermissionType);
router.get('/:ptype/concepts', getPermissionsTypes_Concepts);

export default router;