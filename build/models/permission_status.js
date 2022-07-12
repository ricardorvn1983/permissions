"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_md_1 = __importDefault(require("../db/connection-md"));
const PermissionStatus = connection_md_1.default.define('permission_status', {
    description: {
        type: sequelize_1.DataTypes.CHAR
    }
}, {
    timestamps: false,
    underscored: true
});
exports.default = PermissionStatus;
//# sourceMappingURL=permission_status.js.map