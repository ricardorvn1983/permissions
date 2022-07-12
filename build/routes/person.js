"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_1 = require("../controllers/person");
const compression_1 = require("../middlewares/compression");
const route_cache_1 = require("../middlewares/route_cache");
// import { cache } from "../middlewares/route_cache";
const router = (0, express_1.Router)();
router.get('/', [(0, route_cache_1.appliedCache)(300), compression_1.compress], person_1.getPersons);
router.get('/:id', (0, route_cache_1.appliedCache)(300), person_1.getPerson);
exports.default = router;
//# sourceMappingURL=person.js.map