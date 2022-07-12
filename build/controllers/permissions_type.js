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
exports.getPermissionsTypes_Concepts = exports.getPermissionType = exports.getPermissionsTypes = void 0;
const concept_1 = __importDefault(require("../models/concept"));
const permission_type_1 = __importDefault(require("../models/permission_type"));
const permissiontype_concept_options = {
    include: {
        model: concept_1.default,
        attributes: ['id', 'description', 'short_description', 'visible_only_hr', 'enable'],
        through: {
            attributes: []
        }
    },
    attributes: ['id', 'description']
};
const getPermissionsTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permissionstypes = yield permission_type_1.default.findAll();
    res.json(permissionstypes);
});
exports.getPermissionsTypes = getPermissionsTypes;
const getPermissionType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ptype } = req.params;
    const permissiontype = yield permission_type_1.default.findByPk(ptype);
    res.json(permissiontype);
});
exports.getPermissionType = getPermissionType;
const getPermissionsTypes_Concepts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ptype } = req.params;
    permission_type_1.default.belongsToMany(concept_1.default, { through: 'conceptsxpermission_types' });
    concept_1.default.belongsToMany(permission_type_1.default, { through: 'conceptsxpermission_types' });
    const permissiontype_concepts = yield permission_type_1.default.findByPk(ptype, permissiontype_concept_options);
    res.json(permissiontype_concepts);
});
exports.getPermissionsTypes_Concepts = getPermissionsTypes_Concepts;
//# sourceMappingURL=permissions_type.js.map