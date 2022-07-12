"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const motive_1 = require("../controllers/motive");
const router = (0, express_1.Router)();
router.get('/', motive_1.getMotives);
exports.default = router;
//# sourceMappingURL=motive.js.map