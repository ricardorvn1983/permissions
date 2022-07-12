"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissions_type_1 = require("../controllers/permissions_type");
const router = (0, express_1.Router)();
router.get('/', permissions_type_1.getPermissionsTypes);
router.get('/:ptype', permissions_type_1.getPermissionType);
router.get('/:ptype/concepts', permissions_type_1.getPermissionsTypes_Concepts);
exports.default = router;
//# sourceMappingURL=permissions_types.js.map