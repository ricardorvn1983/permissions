"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_md_1 = __importDefault(require("../db/connection-md"));
const Terminal_Logs = connection_md_1.default.define('terminal_log', {
    log_timestamp: {
        type: sequelize_1.DataTypes.DATE
    },
    terminal_id: {
        type: sequelize_1.DataTypes.TINYINT
    },
    reading: {
        type: sequelize_1.DataTypes.CHAR
    }
}, {
    timestamps: false,
    underscored: true
});
exports.default = Terminal_Logs;
//# sourceMappingURL=terminal_log.js.map