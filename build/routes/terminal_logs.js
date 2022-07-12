"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const terminal_log_1 = require("../controllers/terminal_log");
const router = (0, express_1.Router)();
router.post('/', terminal_log_1.postLog);
exports.default = router;
//# sourceMappingURL=terminal_logs.js.map