"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMotives_Concept = exports.getConcept = exports.getConcepts = void 0;
const concept_1 = __importDefault(require("../models/concept"));
const motive_1 = __importDefault(require("../models/motive"));
const motives_concept_options = {
    include: {
        model: motive_1.default,
        attributes: ['id', 'description', 'enable'],
        through: {
            attributes: []
        }
    },
    attributes: ['id', 'description', 'short_description', 'visible_only_hr', 'enable']
};
const getConcepts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const concepts = yield concept_1.default.findAll();
    res.json(concepts);
});
exports.getConcepts = getConcepts;
const getConcept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cid } = req.params;
    const concept = yield concept_1.default.findByPk(cid);
    res.json(concept);
});
exports.getConcept = getConcept;
const getMotives_Concept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cid } = req.params;
    concept_1.default.belongsToMany(motive_1.default, { through: 'motivesxconcept' });
    motive_1.default.belongsToMany(concept_1.default, { through: 'motivesxconcept' });
    const motives_concept = yield concept_1.default.findByPk(cid, motives_concept_options);
    res.json(motives_concept);
});
exports.getMotives_Concept = getMotives_Concept;
//# sourceMappingURL=concept.js.map