"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permission_1 = require("../controllers/permission");
const router = (0, express_1.Router)();
/* function parseDate (req, res, next) {
    
    // req.query.create_date = "";
    next();
} */
// router.get('/', [appliedCache(300)], getPermissions);
router.get('/', permission_1.getPermissions);
router.get('/search', permission_1.getFilterPermissions);
router.get('/:id', permission_1.getPermission);
router.post('/', permission_1.postPermission);
router.put('/:id', permission_1.putPermission);
router.delete('/:id', permission_1.deletePermission);
exports.default = router;
//# sourceMappingURL=permission.js.map