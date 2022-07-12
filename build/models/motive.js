"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_md_1 = __importDefault(require("../db/connection-md"));
const Motive = connection_md_1.default.define('motive', {
    description: {
        type: sequelize_1.DataTypes.CHAR
    },
    enable: {
        type: sequelize_1.DataTypes.SMALLINT
    }
}, {
    timestamps: false
});
exports.default = Motive;
//# sourceMappingURL=motive.js.map