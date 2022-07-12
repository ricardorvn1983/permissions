"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_md_1 = __importDefault(require("../db/connection-md"));
const concept_1 = __importDefault(require("./concept"));
const motive_1 = __importDefault(require("./motive"));
const MotivesxConcept = connection_md_1.default.define('motivesxconcept', {
    concept_id: {
        type: sequelize_1.DataTypes.TINYINT,
        references: {
            model: concept_1.default,
            key: 'id'
        }
    },
    motive_id: {
        type: sequelize_1.DataTypes.TINYINT,
        references: {
            model: motive_1.default,
            key: 'id'
        }
    }
}, {
    underscored: true,
    timestamps: false
});
exports.default = MotivesxConcept;
//# sourceMappingURL=motivesxconcept.js.map