"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscribe_1 = require("../controllers/subscribe");
const router = (0, express_1.Router)();
router.get('/', subscribe_1.subscribe);
exports.default = router;
//# sourceMappingURL=subscribe.js.map