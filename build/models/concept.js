"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_md_1 = __importDefault(require("../db/connection-md"));
const Concept = connection_md_1.default.define('concept', {
    description: {
        type: sequelize_1.DataTypes.CHAR
    },
    short_description: {
        type: sequelize_1.DataTypes.CHAR
    },
    visible_only_hr: {
        type: sequelize_1.DataTypes.TINYINT
    },
    enable: {
        type: sequelize_1.DataTypes.TINYINT
    },
}, {
    timestamps: false,
    underscored: true
});
exports.default = Concept;
//# sourceMappingURL=concept.js.map