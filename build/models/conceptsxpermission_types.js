"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_md_1 = __importDefault(require("../db/connection-md"));
const concept_1 = __importDefault(require("./concept"));
const permission_type_1 = __importDefault(require("./permission_type"));
const ConceptxPermission_Types = connection_md_1.default.define('conceptsxpermission_types', {
    concept_id: {
        type: sequelize_1.DataTypes.TINYINT,
        references: {
            model: concept_1.default,
            key: 'id'
        }
    },
    permission_types_id: {
        type: sequelize_1.DataTypes.TINYINT,
        references: {
            model: permission_type_1.default,
            key: 'id'
        }
    }
}, {
    underscored: true,
    timestamps: false
});
exports.default = ConceptxPermission_Types;
//# sourceMappingURL=conceptsxpermission_types.js.map