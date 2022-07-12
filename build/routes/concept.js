"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const concept_1 = require("../controllers/concept");
const router = (0, express_1.Router)();
router.get('/', concept_1.getConcepts);
router.get('/:cid', concept_1.getConcept);
router.get('/:cid/motives', concept_1.getMotives_Concept);
exports.default = router;
//# sourceMappingURL=concept.js.map